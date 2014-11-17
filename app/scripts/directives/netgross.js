'use strict';

angular.module('artApp')
  .directive('netGross', function () {
    return {
      templateUrl: 'views/artworks/_netgross.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	// changing price between NET and GROSS
        element.on('click', '.netgross', function(){
          var setNetgross = angular.element(this).data('netgross');
          scope.$apply(function(){
            scope.artwork.includes_vat = (setNetgross === 'net') ? true : false;
          });
        });
      }
    };
  });
