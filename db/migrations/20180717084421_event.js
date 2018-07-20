
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event', table => {
      table.increments()
      table.string('title')
      table.text('image_url')
      table.text('location')
      table.dateTime('time')
      table.text('description')
      table.integer('group_id')
      .references('id')
      .inTable('group')
      .notNullable()
      .index()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event')
};
