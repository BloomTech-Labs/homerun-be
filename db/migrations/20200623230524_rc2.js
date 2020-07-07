exports.up = function(knex) {
  return knex.schema
    .alterTable('members', tbl => {
      // with a reworked signup flow this is no longer necessary
      tbl.dropColumn('active');
      // this is only used on the front-end
      // instead of taking up room in the database with an extremely redundant field
      // just add a 'child' bool to the object before returning it in any responses
      tbl.dropColumn('child');
      tbl.dropColumn('points');
    })
    .alterTable('children', tbl => {
      // same justification as above
      tbl.dropColumn('child');
      tbl.dropColumn('points');
    })
    .alterTable('confirmations', tbl => {
      // this column dropped as part of sign-up rework. When a confirmation is stored,
      // the member doesn't exist yet. We just need to remember what email they used
      // so that they can finish registration by choosing their username/password
      tbl.dropColumn('member_id');
      tbl.varchar('email', 128).notNullable();
    })
};

exports.down = function(knex) {
  // temp  
};
