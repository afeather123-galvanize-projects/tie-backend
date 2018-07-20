
exports.up = function(knex, Promise) {
    return knex.schema.createTable('group_comments', table => {
        table.increments()
        table.text('comment')
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
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('group_comments')
  };