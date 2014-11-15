'use strict';

/**
 * @ngdoc filter
 * @name artApp.filter:idExtractor
 * @function
 * @description
 * # idExtractor
 * Filter in the artApp.
 */
angular.module('artApp')
	.filter('idExtractor', function () {
		return function (input) {
			var splitter = input.split('/');
			if(splitter.length > 0){
				return splitter[splitter.length - 1];
			}
			else {
				return input;
			}
		};
	});
