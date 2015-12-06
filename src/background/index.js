// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

var WebTorrent = require('webtorrent');

magnetUri = '';

console.log('starting torrent', magnetUri);
var client = new WebTorrent();
client.add(magnetUri, {path: ''}, function (torrent) {
  // Got torrent metadata!
  console.log('Client is downloading:', torrent.infoHash)

  torrent.files.forEach(function (file) {
    console.log('client done downloading', file);
    // Display the file by appending it to the DOM. Supports video, audio, images, and
    // more. Specify a container element (CSS selector or reference to DOM node).
    file.appendTo('body');
  });
});

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('frontend.html', {
    id: 'main-window',
    minWidth: 800,
    minHeight: 600,
    //frame: 'none'
  });
});

console.log('here');
