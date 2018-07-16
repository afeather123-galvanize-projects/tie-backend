const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const passport = require('./config/passport').passport
const cors = require('cors')
app.use(cors())
app.use(passport.initialize())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get("/", function(req, res) {
  res.json({message: "Express is up!"});
});
require('./config/routes')(app)

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({message: "Success! You can not see this without a token"});
});

// app.get("/secretDebug",
//   function(req, res, next){
//     console.log(req.get('Authorization'));
//     next();
//   }, function(req, res){
//     res.json("debugging");
// });

app.listen(8000, function() {
  console.log("Express running");
});