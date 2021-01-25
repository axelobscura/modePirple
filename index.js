
// Dependencies
const http = require('http');
const https = require('https');
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require('./config');
var fs = require("fs");

// The server should respond to all requests with a string
var httpServer = http.createServer(function(req, res){
  unifiedServer(req, res);
});

//start the HTTP server, and have it listen on port 7575
httpServer.listen(config.httpPort, function(){
  console.log('server listening on '+config.httpPort);
});

var httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};

var httpsServer = https.createServer(httpsServerOptions, function(req, res){
  unifiedServer(req, res);
});

//start the HTTPS server, and have it listen on port 7579
httpsServer.listen(config.httpsPort, function(){
  console.log('server listening on '+config.httpsPort);
});

//Configuration function for http and https
var unifiedServer = function(req, res){
  //get the url and parse it
  var parsedUrl = url.parse(req.url, true)

  //get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  //get the query string as an object
  var queryStringObject = parsedUrl.query;

  //get the http method
  var method = req.method.toLocaleLowerCase();

  //get the headers as an object
  var headers = req.headers;

  //get the payload if there is any
  var decoder = new StringDecoder('utf-8');
  var buffer = "";
  req.on('data',function(data){
    buffer += decoder.write(data);
  });
  req.on('end',function(){
    buffer += decoder.end();

    // Choose the handler the request should go to
    var chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    //Route the request to the handler specified in the router
    chooseHandler(data, function(statusCode, payload){
      // Use the status code called back by the handler
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      // Use the payload code called back by the handler
      payload = typeof(payload) == 'object' ? payload : {};
      // Covert payload to string
      var payloadString = JSON.stringify(payload);
      // Return the response
      res.setHeader('Content-Type','application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log('Trimmed path is: '+trimmedPath+' with a method: '+method+' with this query string params '+JSON.stringify(queryStringObject)+', the headers are '+JSON.stringify(headers));
      console.log('Returning this response: ' + statusCode,payloadString);
    });
  });
}

// Define the handlers
var handlers = {};

// Sample handler
handlers.sample = function(data, callback){
  // Callback a http status code, and a payload object
  callback(406, {'name':'sample handler'});
};

// Not found handler
handlers.notFound = function(data, callback){
  callback(404, {'message':'That router does not exist...'})
};

// Define a request router
var router = {
  'sample': handlers.sample
};