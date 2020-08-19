var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");
var NodeGeocoder = require('node-geocoder');

ms = function(){
    var usr = res.locals.currentUser.username;
    Campground.findOne({username: usr}, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            campgrounds.forEach(campground => {
                campground.count=0;
                if(result.q1 === campground.q1){
                    count = count + 1;
                }
                if(result.q2 === campground.q2){
                    count = count + 1;
                }
                if(result.q3 === campground.q3){
                    count = count + 1;
                }
                if(result.q4 === campground.q4){
                    count = count + 1;
                }
                if(result.q5 === campground.q5){
                    count = count + 1;
                }
            });
        }
    })  
}


//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds, page:'campgrounds'});
       }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn , function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var phoneNumber= req.body.phoneNumber;
    var gender= req.body.gender;
    var hometown= req.body.hometown;
    var occupation= req.body.occupation;
    var education= req.body.education;
    var age= req.body.age;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {q1: q1, q2: q2, q3: q3, q4: q4, q5:q5, name: name, image: image, age: age, phoneNumber: phoneNumber, gender: gender, hometown: hometown, occupation: occupation, education: education, author:author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    var newData = {name: req.body.name, image: req.body.image, cost: req.body.cost, description: req.body.description};
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

router.delete("/:id", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirexct("/campgrounds");
        }
    });
});



module.exports = router;
