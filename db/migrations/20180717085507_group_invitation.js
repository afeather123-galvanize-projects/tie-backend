
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_invitation', table => {
    table.increments()
    table.integer('user_id')
    .references('id')
    .inTable('user')
    .notNullable()
    .index()
    table.integer('group_id')
    .references('id')
    .inTable('group')
    .notNullable()
    .index()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('group_invitation')
};
