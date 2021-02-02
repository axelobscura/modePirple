/*
  * Request handlers
*/

// Dependencies

// Define the handlers
var handlers = {};

// Users
handlers.users = function(data, callback){
  
}

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