// import npm's
const express = require('express')
const app = express()
const method = require('method-override')
const db = require('./Config/database')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./Models/users")
const bodyParser = require('body-parser')
const tasks = require('./Routes/tasks')
const users = require('./Routes/users')
const passportLocalMongoose = require("passport-local-mongoose")
	


// set the view engine to ejs
app.set('view engine', 'ejs');



// bring body parser 
app.use(bodyParser.urlencoded({ extended: true }))


// middleware for editing text
app.use(method('_method',{methods: ['POST','GET']}))

//session and flash
app.use(session({
secret: 'Nawaf', 
resave: false, 
saveUninitialized: false, 
cookie: {maxAge: 60000 * 15}
}))

//passport initialize
app.use(passport.initialize());
app.use(passport.session());

//passport local strategy
passport.use(new LocalStrategy(User.authenticate(), {
    model: User
}));

//passport serialize and deserialize
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash
app.use(flash())

// middleware router
app.use('/',tasks)

// bring tasks routes
//app.use('/tasks', tasks)

// bring user routes
app.use('/users', users)

//port
app.listen(3000,()=> console.log('express started'))