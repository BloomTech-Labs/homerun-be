exports.up = function(knex) {
  return knex.schema.alterTable("members", tbl => {
    tbl
      .string("username", 40)
      .notNullable()
      .unique()
      .alter();
    tbl
      .string("email", 128)
      .notNullable()
      .unique()
      .alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("members", tbl => {
    tbl.string("username", 40).notNullable();
    tbl.string("email", 128).notNullable();
  });
};
