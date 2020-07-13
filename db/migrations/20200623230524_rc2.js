exports.up = function(knex) {
  return knex.schema
    .alterTable('members', tbl => {
      // with a reworked signup flow this is no longer necessary
      tbl.dropColumn('active');
      // this is only used on the front-end
      // instead of taking up room in the database with an extremely redundant field
      // just add a 'child' bool to the object before returning it in any responses
      tbl.dropColumn('child');
    })
    .alterTable('children', tbl => {
      // same justification as above
      tbl.dropColumn('child');
    })
    .alterTable('confirmations', tbl => {
      // this column dropped as part of sign-up rework. When a confirmation is stored,
      // the member doesn't exist yet. We just need to remember what email they used
      // so that they can finish registration by choosing their username/password
      tbl.dropColumn('member_id');
      tbl.varchar('email', 128).notNullable();
    })
    .alterTable('household_members', tbl => {
      // for the next release-canvas with permission levels
      // this table is currently empty, so this won't cause any errors
      tbl.integer("permissions").notNullable();
    })
    .alterTable('households', tbl => {
      // increase the limit from 7 chars to 255 and use uuid's which are more secure
      // also significantly reduces the risk of collisions
      tbl.varchar('id', 255).notNullable().alter()
    })
};

exports.down = function(knex) {
  // temp  
};
