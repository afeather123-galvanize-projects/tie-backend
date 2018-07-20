const faker = require('faker')
const seed_config = require('../seeddb')
const {num_events_per_group} = require('../seeddb')

exports.seed = function(knex, Promise) {
  return knex('event').del()
    .then(function () {
      const events = []
      const num_events = seed_config.num_events()
      console.log(num_events)
      for (let i = 1; i <= num_events; i++) {
        const event = {
          title: faker.lorem.words(3),
          image_url: 'https://loremflickr.com/320/240?random=' + i,
          location: faker.address.streetAddress(),
          time: faker.date.future(),
          description: faker.lorem.lines(1),
          group_id: Math.ceil(i / num_events_per_group),
        }
        events.push(event)
      }
      return knex('event').insert(events);
    });
};
