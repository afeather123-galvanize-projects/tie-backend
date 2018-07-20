module.exports = {
    num_users: 10,
    num_groups_one_user_in: 3,
    num_events_per_group: 3,
    num_comments_on_event: 1,
    num_groups: function() {
        return Math.ceil(this.num_users / this.num_groups_one_user_in) * this.num_groups_one_user_in
    },
    num_events: function() {
        return this.num_groups() * this.num_events_per_group
    }
}