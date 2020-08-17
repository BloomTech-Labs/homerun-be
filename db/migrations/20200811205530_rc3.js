exports.up = function (knex, Promise) {
  return knex.schema
    .table('members', (tbl) => {
      tbl.integer('permission_level').defaultTo(4);
    })
    .table('invite_confirmations', (tbl) => {
      tbl.integer('permissionOfLevel');
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('members', (tbl) => {
    tbl.dropColumn('permission_level');
    knex.schema.table('invite_confirmations', (tbl) => {
      tbl.dropColumn('permissionOfLevel');
    });
  });
};
