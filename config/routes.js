//Update the name of the controller below and rename the file.
const auth = require('../controllers/users/authentication')
module.exports = function(app){

  app.post('/register', auth.register)
  app.post('/login', auth.login)
}
