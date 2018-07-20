const faker = require('faker')
const {num_users} = require('../seeddb')
const {hash} = require('../../config/hasher')

exports.seed = function(knex, Promise) {
  return knex('user').del()
    .then(function () {
      const users = []
      for(let i = 0; i < num_users; i++) {
        const user = {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: 'test'
        }
        users.push(user)
      }
      const promises = users.map(user => hash(user))
      Promise.all(promises).then(values => {
        return knex('user').insert(values)
      })
    });
};
