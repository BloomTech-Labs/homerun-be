exports.up = function (knex) {
  return (
    knex.schema.alterTable('invite_confirmations'),
    (tbl) => {
      tbl.integer('permission_level');
    }
  );
};

exports.down = function (knex) {
  return knex.schema.alterTable('invite_confirmations', (tbl) => {
    tbl.dropColumn('permission_level');
  });
};
