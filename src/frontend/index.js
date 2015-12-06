const angular = require('angular');
const angularAnimate = require('angular-animate');
const angularAria = require('angular-aria');
const ngMaterial = require('angular-material');

//controllers
var BodyController = require('./controllers/BodyController.js');

//fix for history api not being available in chrome apps
//see https://github.com/angular/angular.js/issues/11932
angular.module('app', [], function($provide) {
    // Prevent Angular from sniffing for the history API
    // since it's not supported in packaged apps.
    $provide.decorator('$window', function($delegate) {
        $delegate.history = null;
        return $delegate;
    });
});


var app = angular.module('mainApp', [ngMaterial]);
app.controller('BodyController', ['$scope', '$http', BodyController]);
