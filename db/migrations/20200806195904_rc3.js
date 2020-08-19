exports.up = function (knex) {
  return knex.schema
    .alterTable('todo_categories', (table) => {
      table.dropColumn('category_name');

      table
        .integer('category_id')
        .notNullable()
        .references('category.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('category', (table) => {
      table.dropColumn('category_name');
      table
        .varchar('household_id')
        .notNullable()
        .references('households.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('category', (table) => {
      table.string('category_name').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema

    .alterTable('category', (table) => {
      table.dropColumn('category_name');
      table.dropColumn('household_id');
    })
    .alterTable('category', (table) => {
      table.text('category_name').unique().notNullable();
    })
    .alterTable('todo_categories', (table) => {
      table
        .text('category_name')
        .unsigned()
        .references('category.category_name')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.dropColumn('category_id');
    });
};
