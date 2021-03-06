'use strict';

// directive for handling editing artworks

angular.module('artApp')
	.directive('artworkEdit', function () {
		return {
			templateUrl: 'views/artworks/_editCreate.html',
			restrict: 'A',
			controller: 'ArtworkEditCtrl',
			link: function postLink(scope, element, attrs) {

				scope.artworkAtLink = angular.copy(scope.artwork);

				// canceling edit
				element.on('click', '.stopEdit', function(){
					scope.artwork = scope.artworkAtLink;
					scope.$apply(function(){
						scope.artwork.inEdit = false;
					});
				});

				// adding material
				element.on('keyup', '#addMaterial', function(e){
					if(e.keyCode === 13){
						scope.addMaterialAndAttach();
					}
				});

			}
		};
	});
