// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

Parse.initialize("pelE80NCz6F6CzySUtgXspDGXVEm6rA4MDThhLCM", "0OoJKprEh2IIxF81RlbwLZzHQjQqdMTLvOP0xVXT");
var facebookApp = angular.module("starter", ["ionic", "ngCordova"]);
angular.module('starter', ['ionic', 'starter.controllers'])


.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        cordova.plugins.backgroundMode.enable()
        window.addEventListener("batterystatus", onBatteryStatus, false);

        function onBatteryStatus(info) {
            // Handle the online event
            console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
            if(info.level < 15 && !info.isPlugged) {
                console.log("Level is low, we should do a request thing now")
            }
            if(info.level > 80 && !info.isPlugged || info.level > 95 && info.isPlugged) {
                console.log("Level is high, we should say we're available")
            }
        }


    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html'
            }
        }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
