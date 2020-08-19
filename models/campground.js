var mongoose = require("mongoose");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    phoneNumber: Number,
    gender: String,
    hometown: String,
    occupation: String,
    education: String,
    age: Number,
    q1: Number,
    q2: Number,
    q3: Number,
    q4: Number,
    q5: Number,
    count: Number,
    createdAt: { type: Date, default: Date.now },
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;