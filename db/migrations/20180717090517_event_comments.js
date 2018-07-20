
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_comments', table => {
      table.increments()
      table.text('comment')
      table.integer('event_id')
      .references('id')
      .inTable('event')
      .notNullable()
      .index()
      table.integer('user_id')
      .references('id')
      .inTable('user')
      .notNullable()
      .index()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_comments')
};
