const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ // create a Schema for an user that will contain the following information, email and password
    email: String,
    password: String

});

const User = mongoose.model("User", userSchema);

exports.saveUser = function (inMail, inPassword){ // exports the list that will contain the user data
    var user = User({
        email: inMail,
        password: inPassword,
    });

    user.save();
};

exports.getUser = async function (uEmail) { // finds the user email and exports it
    return await User.findOne({email : uEmail});
};