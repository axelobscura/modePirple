
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

  //get the http method

  //send the response
  res.end('Hello world!');
  //log the request path
  console.log('Trimmed path is: '+trimmedPath);
});

server.listen(7575, function(){
  console.log('server listening on 7575');
})