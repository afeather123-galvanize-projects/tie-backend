const knex = require('../db/knex')

module.exports = {
    getGroups: (req,res) => {
        knex('group_member')
        .where('user_id', req.user.id)
        .join('group', 'group.id', 'group_member.group_id')
        .then(result => {
            res.json(result)
        })
    },

    getGroup: (req, res) => {
        const group_id = req.params.group_id
        if(group_id) {
            knex('group_member')
            .where('user_id', req.user.id)
            .where('group_member.group_id', group_id)
            .join('group', 'group.id', 'group_member.group_id')
            .then(groups => {
                if(groups.length > 0) {
                    res.json(groups)
                } else {
                    res.json([{invalid: true, id: Number(req.params.group_id)}])
                }
            })
        } else {
            res.sendStatus(400)
        }
    },

    createGroup: async (req,res) => {
        const {title, description, image_url} = req.body
        let group = await knex('group')
        .insert({title, description, image_url})
        .returning('*')
        group = group[0]
        let group_member = await knex('group_member')
        .insert({group_id: group.id, user_id: req.user.id, isAdmin: true}).returning('*')
        console.log(group_member)
        group.isAdmin = group_member[0].isAdmin
        res.json([group])
    },

    inviteToGroup: async (req,res) => {
        const {group_id, email} = req.body
        let user = await knex('user')
        .where('email', email)
        user = user[0]
        if(user) {
            knex('group_invitation')
            .insert({group_id, user_id: user.id})
            .then(() => {
                res.json({invite_success: true})
            })
        } else {
            res.json({invite_success: false})
        }
    },

    getInvites: async (req,res) => {
        const invites = await knex('group_invitation')
        .where('user_id', req.user.id)
        .join('group', 'group.id', 'group_invitation.group_id')
        res.json(invites)
    },

    addToGroup: async (req,res) => {
        const {group_id} = req.body
        const invite = await knex('group_invitation')
        .where('group_id', group_id)
        .where('user_id', req.user.id)
        if(invite.length > 0) {
            await knex('group_invitation')
            .delete()
            .where('group_id', group_id)
            .where('user_id', req.user.id)
            const membership = await knex('group_member')
            .insert({group_id, user_id: req.user.id, isAdmin: false})
            const group = await knex('group').where('id', group_id)
            group[0].isAdmin = false
            res.json(group)
        } else {
            res.json([])
        }
    }
}