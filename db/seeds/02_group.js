
const faker = require('faker')
const config = require('../seeddb')

exports.seed = function(knex, Promise) {
  return knex('group').del()
    .then(function () {
      const num_groups = config.num_groups()
      const groups = []
      for (let i = 0; i < num_groups; i++) {
        const group = {
          title: faker.company.companyName(),
          image_url: 'https://loremflickr.com/320/240?random=' + i,
          description: faker.lorem.paragraph()
        }
        groups.push(group)
      }
      return knex('group').insert(groups);
    });
};
