
exports.up = function(knex) {
  return knex.schema
  .createTable("category", tbl => {
      tbl.increments();
      tbl.text("category_name")
         .unique()
         .notNullable();
  })
  .createTable("todo_categories", tbl => {
      tbl.increments();
      tbl.integer("todo_id")
         .unsigned()
         .references("todos.id")
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
      tbl.text("category_name")
         .unsigned()
         .references("category.category_name")
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists("todo_categories")
        .dropTableIfExists("category");
};
