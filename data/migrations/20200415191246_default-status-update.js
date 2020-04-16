
exports.up = function (knex) {
	return knex.schema.alterTable("todos", (col) => {
		col.boolean('completed').defaultsTo(false).alter()
	})
};

exports.down = function (knex) {
	return knex.schema.alterTable("todos", (col) => {
		col.boolean('completed').alter()
	})
};
