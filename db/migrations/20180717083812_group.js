
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group', table => {
    table.increments()
    table.string('title')
    table.text('description')
    table.text('image_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('group')
};
