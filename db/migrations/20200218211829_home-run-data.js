exports.up = function (knex) {
  return knex.schema
    .createTable('households', (col) => {
      col.varchar('id', 7).notNullable().unique();
      col.varchar('title', 40);
      col.integer('pin', 4);
    })
    .createTable('members', (col) => {
      col.increments();
      col.varchar('username', 40).notNullable().unique();
      col.varchar('email', 128).notNullable().unique();
      col.text('password');
      col.text('provider');
      col.text('access_token');
      col.text('refresh_token');
      col.integer('points');
      col.integer('permission_level').defaultTo(4);
      col.boolean('child').defaultsTo(false);
      col.boolean('active').defaultsTo(false);
      col
        .varchar('current_household')
        .unsigned()
        .references('households.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('todos', (col) => {
      col.increments();
      col.text('household').notNullable();
      col.varchar('title', 40).notNullable();
      col.varchar('desc', 255);
      col.integer('point_value');
      col.bigint('created_at');
      col.bigint('due');
      col.boolean('completed');
      col.text('completed_by');
    })
    .createTable('rewards', (col) => {
      col.increments();
      col.text('title').notNullable();
      col.integer('point_total').notNullable();
      col
        .varchar('household_id')
        .unsigned()
        .references('households.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('inventory', (col) => {
      col.increments();
      col
        .varchar('household_id')
        .unsigned()
        .references('households.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('bills', (col) => {
      col.increments();
      col
        .varchar('household_id')
        .unsigned()
        .references('households.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('children', (col) => {
      col.increments();
      col.text('username');
      col.integer('points');
      col.boolean('child').defaultsTo(true);
      col
        .varchar('household_id')
        .unsigned()
        .references('households.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('household_members', (col) => {
      col.increments();
      col
        .integer('member_id')
        .unsigned()
        .references('members.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      col
        .varchar('household_id')
        .unsigned()
        .references('households.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('todos_members', (col) => {
      col
        .integer('member_id')
        .defaultTo(0)
        .unsigned()
        .references('members.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      col
        .integer('todo_id')
        .unsigned()
        .references('todos.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      col.primary(['member_id', 'todo_id']);
    })
    .createTable('todos_children', (col) => {
      col
        .integer('child_id')
        .defaultTo()
        .unsigned()
        .references('children.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      col
        .integer('todo_id')
        .unsigned()
        .references('todos.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      col.primary(['child_id', 'todo_id']);
    })
    .createTable('confirmations', (col) => {
      col.increments('id');
      col.text('hash');
      col
        .integer('member_id')
        .unsigned()
        .notNullable()
        .references('members.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      col.integer('permissionLevel')
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('confirmations')
    .dropTableIfExists('todos_members')
    .dropTableIfExists('household_members')
    .dropTableIfExists('children')
    .dropTableIfExists('bills')
    .dropTableIfExists('inventory')
    .dropTableIfExists('rewards')
    .dropTableIfExists('todos')
    .dropTableIfExists('members')
    .dropTableIfExists('households');
};
