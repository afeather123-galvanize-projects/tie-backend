const knex = require('../../db/knex')
const jwt = require('jsonwebtoken')
const {hash, check} = require('../../config/hasher')
const {jwtOptions} = require('../../config/passport')

module.exports = {
    register: (req,res) => {
        console.log(req.body)
        const {name, password, email} = req.body
        if(name && password && email) {
            hash({name,password, email}).then(user => {
                console.log('hashed', user)
                knex('user')
                .insert(user)
                .returning('*')
                .then(createdUser => {
                    createdUser = createdUser[0]
                    console.log(createdUser)
                    const token = jwt.sign({id: createdUser.id}, jwtOptions.secretOrKey)
                    res.json({message: 'ok', token: token, name: createdUser.name})
                })
            })
            
        } else {
            res.sendStatus(400)
        }
    },

    login: function(req, res) {
        const {email, password} = req.body
        if(!(email && password)) {
            res.sendStatus(400)
            return
        }
        // usually this would be a database call:
        knex('user')
        .where('email', email)
        .then(user => {
            user = user[0]
            if(user) {
                check(user, {password}).then(valid => {
                    if(valid) {
                        const payload = {id: user.id}
                        const token = jwt.sign(payload, jwtOptions.secretOrKey)
                        res.json({message: "ok", token: token, name: user.name});
                    } else {
                        res.json({message: "invalid password"})
                    }
                })
            } else {
                res.sendStatus(404)
            }
        })
    }
}