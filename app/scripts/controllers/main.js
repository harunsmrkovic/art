'use strict';

/**
 * @ngdoc function
 * @name artApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the artApp
 */
angular.module('artApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
