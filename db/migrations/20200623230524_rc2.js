exports.up = function (knex) {
  return knex.schema
    .alterTable('members', (tbl) => {
      // with a reworked signup flow this is no longer necessary
      tbl.dropColumn('active');
      // this is only used on the front-end
      // instead of taking up room in the database with an extremely redundant field
      // just add a 'child' bool to the object before returning it in any responses
      tbl.dropColumn('child');
    })
    .alterTable('children', (tbl) => {
      // same justification as above
      tbl.dropColumn('child');
    })
    .alterTable('household_members', (tbl) => {
      // for the next release-canvas with permission levels
      // this table is currently empty, so this won't cause any errors
      tbl.integer('permissions').notNullable();
    })
    .alterTable('households', (tbl) => {
      // increase the limit from 7 chars to 21 and use nanoid's which are more secure
      // also significantly reduces the risk of collisions
      // PS: can't change to .uuid() because it messes with pre-existing IDs
      tbl.varchar('id', 21).notNullable().alter();
    })
    .dropTableIfExists('confirmations')
    .createTable('account_confirmations', (tbl) => {
      // length of nanoid = 21
      tbl.varchar('id', 21).primary().unique().notNullable();
      tbl.varchar('pin', 8).nullable();
      tbl.varchar('email', 128).notNullable();
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('password_confirmations', (tbl) => {
      tbl.varchar('id', 21).primary().unique().notNullable();
      tbl
        .integer('member_id')
        .unsigned()
        .notNullable()
        .references('members.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('invite_confirmations', (tbl) => {
      tbl.varchar('id', 21).primary().unique().notNullable();
      tbl
        .integer('member_id')
        .unsigned()
        .notNullable()
        .references('members.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .varchar('household_id', 21)
        .notNullable()
        .references('households.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function () {
  // By increasing the size of the household IDs, rollback would require them to be altered or deleted
  // Deletion is restricted by members.current_household
  // Alteration is risky because of collision conflicts
  // Adding back the child and active columns of members wouldn't make sense because
  // the code is reworked to not need them
  throw 'Unable to roll back database beyond this migration';
};
