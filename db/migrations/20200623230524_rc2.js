exports.up = function(knex) {
  return knex.schema
    // should permissions be stored in a read-only database table?
    // this would let the front-end and back-end 
    // .createTable('permissions', (tbl) => {
    //   tbl.increments();
    // })
    .createTable('household_members', (tbl) => {
      tbl.increments();
      tbl.integer('household_id')
        .unsigned()
        .references("households.id")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('member_id')
        .unsigned()
        .references("members.id")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('permission_level')
        .unsigned();
    })
};

exports.down = function(knex) {
  // temp  
};
