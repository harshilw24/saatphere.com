
var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        gender: req.body.gender,
        age: req.body.age,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
        education: req.body.education,
        occupation: req.body.occupation
    });
    //eval(require('locus'));
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to YelpCamp "+user.username);
           res.redirect("/campgrounds"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login",{page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","Logged You Out.");
   res.redirect("/campgrounds");
});

//Users Profile 
router.get("/users/:id", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("err", "Something went wrong.");
            res.redirect("/");
        }
        res.render("users/show", {user: foundUser});
    });
});

module.exports = router;

