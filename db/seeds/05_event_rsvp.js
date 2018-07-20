const config = require('../seeddb')

exports.seed = function(knex, Promise) {
  return knex('event_rsvp').del()
    .then(function () {
      const event_rsvps = []
      const {num_users, num_events_per_group, num_groups_one_user_in} = config
      const num_groups = config.num_groups()
      for(let i = 1; i < num_users; i++) {
        for (let j = 1 + i % num_groups_one_user_in; j <= num_groups; j+=num_groups_one_user_in) {
          const event_rsvp = {
            event_id: j * num_events_per_group,
            user_id: i
          }
          console.log(event_rsvp)
          event_rsvps.push(event_rsvp)
        }
      }
      return knex('event_rsvp').insert(event_rsvps);
    });
};
