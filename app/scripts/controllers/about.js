'use strict';

/**
 * @ngdoc function
 * @name artApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the artApp
 */
angular.module('artApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
