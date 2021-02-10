/*
  * Request handlers
*/

// Dependencies

// Define the handlers
var handlers = {};

// Users
handlers.users = function(data, callback){
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data, callback);
  }else{
    callback(405);
  }
}

// Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
handlers._users.post = function(data, callback){
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? 
};

// Users - get
handlers._users.get = function(data, callback){

};

// Users - put
handlers._users.put = function(data, callback){

};

// Users - delete
handlers._users.delete = function(data, callback){

};

//Ping Handler
handlers.ping = function(data,callback){
  callback(200)
}

//Hello Handler
handlers.hello = function(data,callback){
  callback(200, {'message':'Welcome to my new API...'})
}

// Not found handler
handlers.notFound = function(data, callback){
  callback(404, {'message':'That router does not exist...'})
};


// Export the module
module.exports = handlers