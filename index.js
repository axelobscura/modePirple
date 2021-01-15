
// Dependencies
const http = require('http');
const url = require("url");

// The server should respond to all requests with a string
var server = http.createServer(function(req, res){
  //get the url and parse it
  var parsedUrl = url.parse(req.url, true)

  //get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  //get the query string as an object
  var queryStringObject = parsedUrl.query;

  //get the http method
  var method = req.method.toLocaleLowerCase();

  //send the response
  res.end('Hello world!');
  //log the request path
  console.log('Trimmed path is: '+trimmedPath+' with a method: '+method+' with this query string params '+JSON.stringify(queryStringObject));
});
//start the server, and have it listen on port 7575
server.listen(7575, function(){
  console.log('server listening on 7575');
})