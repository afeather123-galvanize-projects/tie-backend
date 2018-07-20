
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_rsvp', table => {
      table.increments()
      table.integer('user_id')
      .references('id')
      .inTable('user')
      .notNullable()
      .index()
      table.integer('event_id')
      .references('id')
      .inTable('event')
      .notNullable()
      .index()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_rsvp')
};
