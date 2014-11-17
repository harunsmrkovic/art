'use strict';

// directive for controlling view

angular.module('artApp')
	.directive('artworkView', function () {
		return {
			templateUrl: 'views/artworks/_view.html',
			restrict: 'A',
			link: function postLink(scope, element, attrs) {

				element.on('click', '.editArtwork', function(){
					scope.$apply(function(){
						scope.artwork.inEdit = true;
					});
				});

				element.on('click', '.showMore', function(){
					scope.$apply(function(){
						scope.artwork.showMore = (scope.artwork.showMore) ? false : true;
					});
				});

			}
		};
	});
