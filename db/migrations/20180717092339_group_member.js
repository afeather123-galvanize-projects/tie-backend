
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_member', table => {
      table.increments()
      table.integer('group_id')
      .references('id')
      .inTable('group')
      .notNullable()
      .index()
      table.integer('user_id')
      .references('id')
      .inTable('user')
      .notNullable()
      .index()
      table.boolean('isAdmin')
      .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('group_member')
};
