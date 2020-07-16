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
    .alterTable('household_members', tbl => {
      // for the next release-canvas with permission levels
      // this table is currently empty, so this won't cause any errors
      tbl.integer('permissions').notNullable();
    })
    .alterTable('households', tbl => {
      // increase the limit from 7 chars to 255 and use uuid's which are more secure
      // also significantly reduces the risk of collisions
      tbl.varchar('id', 128).notNullable().alter()
    })
    .dropTableIfExists('confirmations')
    .createTable('confirmations', tbl => {
      // length of uuid
      tbl
        .uuid('id')
        .primary()
        .unique()
        .notNullable()
      tbl.varchar('pin', 8).nullable();
      tbl.varchar('email', 128).notNullable();
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('password_confirmations', tbl => {
      tbl.increments();
      tbl.text('hash');
      tbl
        .integer('member_id')
        .unsigned()
        .notNullable()
        .references('members.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .renameTable('confirmations', 'account_confirmations')
};

exports.down = function(knex) {
  // temp  
};
