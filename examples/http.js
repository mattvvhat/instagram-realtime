var colors  = require('colors');
var server  = require('http').createServer(function (req, resp) {
  resp.writeHeader(200, { 'Content-Type' : 'text/plain; charset=utf-8' });
  resp.end('🍕');
}).listen(process.env.PORT || 5000);

console.log('instagram-realtime: '.rainbow + 'http example');
console.log('@: '.blue + new Date());

var InstagramStream = require('../libs/InstagramStream.js');
var secrets = require('./secrets.json');

var stream = InstagramStream(
  server,
  {
    client_id     : secrets.client_id,
    client_secret : secrets.client_secret,
    url           : secrets.url,
    callback_path : 'callback'
  }
);

stream.on('unsubscribe', function (req, body) {
  console.log('unsubscribe'.green);
  stream.subscribe({ tag : 'yolo' });
});

stream.on('unsubscribe/error', function (error, req, body) {
  console.log('unsubscribe/error:'.red + error);
});

stream.on('subscribe', function (req, body) {
  console.log('subscribe'.green);
});

stream.on('subscribe/error', function (error, req, resp) {
  console.log('subscribe/error: '.red + error);
  console.log(resp);
});

stream.on('new', function (req, body) {
  console.log(body);
});

stream.on('new/error', function (error, req, body) {
  console.log('new/error: '.red + error);
});
