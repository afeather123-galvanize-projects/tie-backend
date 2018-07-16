const _ = require('lodash')
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const knex = require('../db/knex')

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// DON'T USE THIS KEY, MOVE TO AN ENVIRONMENTAL VARIABLE AND DON'T PUSH IT TO YOUR REPOSITORY
// OR FACE THE WRATH OF THE INTERNET
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  knex('user')
  .where('id', jwt_payload.id)
  .then(user => {
      user = user[0]
      if(user) {
          next(null, user)
      } else {
          next(null, false)
      }
  })

});

passport.use(strategy);

module.exports = {passport,jwtOptions}