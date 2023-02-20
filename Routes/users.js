const router = require('express').Router()
const Controllers = require('../Controllers/users')



//  login user view 
router.get('/login', Controllers.login)

// login post request 
router.post('/login',Controllers.loginReq )

// sign up form 
router.get('/signup', Controllers.signup)

// sign up post request
router.post('/signup', Controllers.signupReq)

// profile 
router.get('/profile',Controllers.isLoggedIn, Controllers.profile)

// logout user
router.post('/logout', Controllers.logout);




module.exports = router