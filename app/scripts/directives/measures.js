'use strict';

angular.module('artApp')
  .directive('measures', function () {
    return {
      templateUrl: 'views/artworks/_measures.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	// changing measure between CM and INCH
				element.on('click', '.measure', function(){
					var setMeasure = angular.element(this).data('measure');
					scope.$apply(function(){
						scope.artwork.dimensions_in_cm = (setMeasure === 'cm') ? true : false;
					});
				});
      }
    };
  });
