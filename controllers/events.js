const knex = require('../db/knex')

module.exports = {
    getEvents: (req, res) => {
        knex('group_member')
        .select('event.id as id', 'event.location', 'event.description', 
        'event.title', 'event.time', 'group.title as group_title', 
        'event.group_id', 'event.image_url', 'event_rsvp.id as rsvp_id')
        .where('group_member.user_id', req.user.id)
        .join('group', 'group.id', 'group_member.group_id')
        .join('event', 'event.group_id', 'group_member.group_id')
        .leftJoin('event_rsvp', function() {
            this.on('event.id', 'event_rsvp.event_id').andOn('event_rsvp.user_id', req.user.id)
        })
        .then(result => {
            res.json(result)
        })
    },

    getEvent: (req,res) => {
        knex('event')
        .select('event.id as id', 'event.image_url as image_url', 'event.location', 'event.time', 'event.description as description', 'event.title as title', 'group.title as group_title', 'group_member.isAdmin', 'group.id as group_id', 'event_rsvp.id as rsvp_id')
        .where('event.id', req.params.id)
        .join('group_member', function() {
            this.on('event.group_id', 'group_member.group_id').andOn('group_member.user_id', req.user.id)
        })
        .join('group', 'group.id', 'event.group_id')
        .leftJoin('event_rsvp', function() {
            this.on('event.id', 'event_rsvp.event_id').andOn('event_rsvp.user_id', req.user.id)
        })
        .then(event => {
            if(event.length > 0) {
                res.json(event)
            } else {
                res.json([{invalid: true, id: req.params.id}])
            }
        })
    },

    createEvent: (req,res) => {
        console.log(req.body)
        const {title, image_url, location, time, description, group_id} = req.body
        knex('event')
        .insert({title, image_url, location, time, description, group_id})
        .returning('*')
        .then(events => {
            console.log(events)
            res.json(events)
        })
    },

    rsvp: (req,res) => {
        const {event_id} = req.body
        if(event_id) {
            knex('event_rsvp')
            .insert({event_id, user_id: req.user.id})
            .returning('event_id')
            .then(result => {
                res.json(result[0])
            })
        } else {
            res.sendStatus(400)
        }
    },
    cancel: (req,res) => {
        const {event_id} = req.body
        if(event_id) {
            knex('event_rsvp')
            .delete()
            .where('user_id', req.user.id)
            .where('event_id', event_id)
            .returning('event_id')
            .then(result => {
                res.json(result[0])
            })
        } else {
            res.sendStatus(400)
        }
    }
}