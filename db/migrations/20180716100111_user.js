
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments()
    table.text('name')
    .notNullable()
    table.string('email')
    .unique()
    .notNullable()
    table.string('password')
    .notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
};
