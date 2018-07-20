//Update the name of the controller below and rename the file.
const auth = require('../controllers/users/authentication')
const events = require('../controllers/events')
const groups = require('../controllers/groups')
const {passport} = require('./passport')
module.exports = function(app){

  app.post('/register', auth.register)
  app.post('/login', auth.login)
  authorizeRoutes(protectedRoutes, app)
}

const protectedRoutes = [
  {
    path: '/verify',
    method: 'post',
    handler: auth.verify
  },
  {
    path: '/events',
    method: 'get',
    handler: events.getEvents
  },
  {
    path: '/events/:id',
    method: 'get',
    handler: events.getEvent
  },
  {
    path: '/events/rsvp',
    method: 'post',
    handler: events.rsvp
  },
  {
    path: '/events/cancel',
    method: 'delete',
    handler: events.cancel
  },
  {
    path: '/groups',
    method: 'get',
    handler: groups.getGroups
  },
  {
    path: '/groups/:group_id',
    method: 'get',
    handler: groups.getGroup
  },
  {
    path: '/create_event',
    method: 'post',
    handler: events.createEvent
  },
  {
    path: '/create_group',
    method: 'post',
    handler: groups.createGroup
  },
  {
    path: '/invite_to_group',
    method: 'post',
    handler: groups.inviteToGroup
  },
  {
    path: '/invites',
    method: 'get',
    handler: groups.getInvites
  },
  {
    path: '/accept_invite',
    method: 'post',
    handler: groups.addToGroup
  }
]

const authorizeRoutes = (routes, app) => {
  const checker = passport.authenticate('jwt', { session: false })
  routes.forEach(route => {
    const {path, method, handler} = route 
    switch(method.toLowerCase()) {
      case 'get':
        app.get(path, checker, handler)
        break;
      case 'post':
        app.post(path, checker, handler)
        break;
      case 'put':
        app.put(path, checker, handler)
        break;
      case 'patch':
        app.patch(path, checker, handler)
        break;
      case 'delete':
        app.delete(path, checker, handler)
        break;
    }
  })
}