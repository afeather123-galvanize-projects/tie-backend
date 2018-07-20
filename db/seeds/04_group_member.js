const config = require('../seeddb')
const {num_users, num_groups_one_user_in} = require('../seeddb')

exports.seed = function(knex, Promise) {
  return knex('group_member').del()
    .then(function () {
      const num_groups = config.num_groups()
      const group_members = []
      for (let i = 1; i <= num_users; i++) {
        for (let j = 1 + i % num_groups_one_user_in; j <= num_groups; j+=num_groups_one_user_in) {
          let group_member = {
            group_id: j,
            user_id: i,
            isAdmin: i <= num_groups_one_user_in ? true : false
          }
          group_members.push(group_member)
        }
      }
      return knex('group_member').insert(group_members);
    });
};
