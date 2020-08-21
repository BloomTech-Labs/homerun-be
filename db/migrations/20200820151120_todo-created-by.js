exports.up = function (knex) {
  return knex.schema.alterTable('todos', (tbl) => {
    tbl
      .integer('created_by')
      .unsigned()
      .nullable()
      .references('members.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('todos', (tbl) => {
    tbl.dropColumn('created_by');
  });
};
