var express = require('express');
var router = express.Router();
const UsersControl = require('../controllers/users.control')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signin', UsersControl.signIn)
router.get('/signout', UsersControl.signOut)


// POST
router.post('/signup', UsersControl.signUp)


module.exports = router;
