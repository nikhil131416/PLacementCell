const User = require('../models/user');


module.exports.signUp = function(req, res){
    if (req.isAuthenticated()) {
        return res.redirect('back');
    }

    return res.render('user_signup', {
        title: "Placement Cell | Sign Up"
    });
}


module.exports.signIn = function(req, res){
    if (req.isAuthenticated()) {
        return res.redirect('back');
    }
    
    return res.render('user_signin', {
        title: "Placement Cell | Sign In"
    });
}


//Get the sign up data
module.exports.create = async function(req, res){
    //if password and confirm password are not same then redirect back
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    try{
        //if password and confirm password are same then check if user already exists
        let user = await User.findOne({email: req.body.email});
    
        //if user does not exist then create user
        if(!user){
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        else{
            req.flash('error', 'User already exists with this email');
            res.redirect('back');
        }
    }
    catch(err){
        req.flash('error', 'Error something went wrong');
        console.log('Error something went wrong', err);
    };
}


//Get the sign in data
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    // console.log('Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        req.flash('error', "Something went wrong");
        if(err) console.log('Something went wrong');
    });
    
    req.flash('success', 'You are logged out');
    // console.log('Logged out');
    return res.redirect('/');
}
