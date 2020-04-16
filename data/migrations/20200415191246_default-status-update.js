
exports.up = function (knex) {
	knex.schema.alterTable("todos", (col) => {
		col.boolean('completed').defaultsTo(false).alter()
	})
};

exports.down = function (knex) {
	knex.schema.alterTable("todos", (col) => {
		col.boolean('completed').alter()
	})
};
