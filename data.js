var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    Guid = require('Guid');
    bcrypt = require("bcrypt-nodejs");

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

MongoClient.connect(fullMongoUrl).then(function(db) {
        var myCollection = db.collection("user");

<<<<<<< HEAD
        exports.createUser = function(username, encryptedPassword) {
            emptyProfile = {firstName: "", lastName: "", hobby: "", petName: ""};
            
            return myCollection.insertOne({
                    _id: Guid.create().toString(),
                    username: username,
                    encryptedPassword: encryptedPassword,
                    currentSessionId: "",
                    profile: emptyProfile });
            };
        
        exports.updateSession = function(username, sessionID){
            return myCollection.updateOne(
                {username: username},
                {$set:{currentSessionId: sessionID}}).then(
                    function(){
                        return exports.findUserByUserName(username);
                    }
                );
        };
        
        exports.updateProfile = function(sessionID, profile){
          return myCollection.updateOne(
              {currentSessionId: sessionID},
              {$set:{profile: profile}}
          ).then(function(){
              return exports.findUserBySessionID(sessionID);
          });  
        };
        
        exports.findUserByUserName = function(username){
            return myCollection.find({username: username}).limit(1).toArray()
                .then(function(userList){
                    if(userList.length == 0)
                        return Promise.reject("User doesn't exist");
                    else {
                        return Promise.accept("User exist");
                    }
                });
        };
        
        exports.findUserBySessionID = function(SessionID){
            return myCollection.find({currentSessionId: SessionID}).limit(1).toArray()
             .then(function(listOfUser){
                 if(listOfUser.length == 0){
                    return Promise.reject("Session doesn't exist");
                 } else {
                     return listOfUser[0];
                 }
             });
        };
        
        exports.findUserByUserNameAndPassword = function(username, password){
            return myCollection.find({username: username}).limit(1).toArray()
            .then(function(listOfUser){
                if(listOfUser.length == 0){
                    return Promise.reject("User doesn't exist");
                } else {
                    var user = listOfUser[0];
                    if(bcrypt.compareSync(password, user.encryptedPassword)){
                        return user;
                    } else {
                        return Promise.reject("Password dosen't match!")
                    }
                }      
=======
        // setup your body
        exports.createComment = function(comment) {
            // you may return Promise.reject("error message"); if there is an error, such as a comment not being provided;
	    // this will result in a rejected promise immediately being returned

            // return a promise that resolves the new comment
            return myCollection.insertOne({ _id: Guid.create().toString(), comment: comment }).then(function(newDoc) {
                return newDoc.insertedId;
>>>>>>> 487d7e21fe59cee5e6b07f80c3a8b28672048dca
            });
        };
});
    


