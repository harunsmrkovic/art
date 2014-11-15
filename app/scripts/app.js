'use strict';

/**
 * @ngdoc overview
 * @name artApp
 * @description
 * # artApp is a small fictional app for artworks galleries
 *
 * Main module of the application.
 */

angular
  .module('artApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('config', {
    apiRoot: 'http://54.77.217.175'
  });
