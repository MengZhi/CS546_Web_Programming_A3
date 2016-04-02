// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var userData = require('./data.js');
var Guid = require('Guid');
var bcrypt = require("bcrypt-nodejs");

// This package exports the function to create an express instance:
var app = express();

// We can setup Jade now!
app.set('view engine', 'ejs');
app.use(cookieParser());
// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// This middleware will activate for every request we make to 
// any path starting with /assets;
// it will check the 'static' folder for matching files 
app.use('/assets', express.static('static'));

app.get("/", function(request, response) {
    console.log("this is main page");
    if(!request.cookies["session"]){
        response.render("pages/home", {pageTitle: "User Profile System"});
    } else {
        userData.findUserBySessionID(request.cookies["session"])
        .then(function(user) {
            response.redirect("/profile");
        }, function() {
            var expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours()-1);
            response.cookie("session", "", {expires: expiresAt});
            response.clearCookie("session");
            response.render("pages/home", {pageTitle: "User profile System"});
        });
    }
});

app.post("/signup", function(request,response){
    if(!request.body.username || !request.body.password) {
		response.render("pages/error", {pageTitle: "User name and password cannot be empty."});
	} 
    userData.findUserByUserName(request.body.username).then(function() {
		// if exists, reject
		//console.log("User name exists!");
		//response.redirect("/")
    	response.render("pages/home", {pageTitle: "User name exists."});
	}, function() {
		// if not, create a new user
		var encryptedPassword = bcrypt.hashSync(request.body.password);
		userData.createUser(request.body.username, encryptedPassword);
		response.redirect("/")
	});
});

<<<<<<< HEAD
app.get("/profile", function(request, response) {
        if(!request.cookies["session"]){
            response.redirect("/");    
        } else {
            userData.findUserBySessionID(request.cookies["session"])
                .then(
                    function(user) {
                        var profile = user["profile"];
                        response.render("pages/profile", {pageTitle:"User Profile", profile: profile});
                    }, function() {
                        var expiresAt = new Date();
                        expiresAt.setHours(expiresAt.getHours()-1);
                        response.cookie("session", "", {expires: expiresAt});
                        response.clearCookie("session");
                        response.redirect("/");
                    });
        }
    }
);

app.post("/updateProfile", function(request, response) {
    // userData.findUserBySessionID(request.cookies["session"])
    //     .then(function(user){
            
    //     });
    var newProfile = {
                    firstName: request.body.firstname, 
                    lastName: request.body.lastname, 
                    hobby: request.body.hobby, 
                    petName: request.body.petname
                }
    userData.updateProfile(request.cookies["session"], newProfile)
        .then(function(){
            response.redirect("/profile");
        });
});


app.post("/login", function(request, response) {
    if(!request.body.username || !request.body.password){
        response.render("pages/error", {pageTitle: "User name and password cannot be empty."});
    }
    userData.findUserByUserNameAndPassword(request.body.username, request.body.password)
        .then (function(user) {
            sessionId = Guid.create().toString();
            userData.updateSession(request.body.username, sessionId);
            
            // create a cookie
            var expireAt = new Date();
            expireAt.setHours(expireAt.getHours()+2);
            response.cookie("session", sessionId, { expires: expireAt }); // response cookie
            
            response.locals.user = user;
            response.redirect("/profile");
        }, function(error){
            response.render("pages/error", {pageTitle: error});
        });
});

app.post("/logout", function (request, response) { 
	var expiresAt = new Date();
	expiresAt.setHours(expiresAt.getHours()-1);
	response.cookie("session", "", { expires: expiresAt });
	response.clearCookie("session");
	response.locals.user = undefined;
	response.redirect("/");
=======
    // In this route, you will call the createComment function for your data module
    // and respond with the result of that promise            
        // On error, do: 
        // response.render("pages/home", { error: null, comments: ALL THE COMMENTS });

        // On success, do:
        response.redirect("/");
});

app.get("/", function(request, response) {
    // In this route, you will call the getAllComments function for your data module
    // and respond with the result of that promise as your comments section

    response.render("pages/home", { error: null, comments: [] });
>>>>>>> 487d7e21fe59cee5e6b07f80c3a8b28672048dca
});

// We can now navigate to localhost:3000
app.listen(3000, function() {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
