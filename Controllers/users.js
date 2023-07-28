const User = require('../Models/users')
const passport = require("passport")

module.exports = {
    
    isLoggedIn: (req, res, next) => {
	    if (req.isAuthenticated()) return next();
	        res.redirect("users/login");
    },    


    signup:(req,res)=> {
        const username = req.body.username
        const password = req.body.password
        res.render('User/signup', {error: req.flash('error')})
    },

    signupReq: (req, res)=> {
        const username = req.body.username
        const password = req.body.password
        
        User.register(new User({ username: username }), password, 
            function (err, user) {
                if (err) {
                    return res.render("User/signup",{error: req.flash('error')})
                }
    
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/users/login");
                })
            })
    },

    login: (req,res)=> {
        res.render('User/login', {error: req.flash('error')})
    },

    loginReq:  passport.authenticate("local", {
        successRedirect: ("/users/profile"),
        failureRedirect: "/users/login",
        failureFlash: true
    }), function (req, res) {
        
    },
     
    profile: (req,res)=> {
       const id = req.user.id
        User.find({},(error,users)=>{
            if(error){
                console.log(`There was an error: ${error}`)
            }else{
                res.render('User/profile', {user: users, idUser: id })
            }
        }
	    
    )},

    logout:(req, res, next)=> {
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
    }
}
