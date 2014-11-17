'use strict';

/**
 * @ngdoc directive
 * @name artApp.directive:artworkCreate
 * @description
 * # artworkCreate
 */
angular.module('artApp')
	.directive('artworkCreate', function () {
		return {
			templateUrl: 'views/artworks/_editCreate.html',
			restrict: 'A',
			controller: 'ArtworkCreateCtrl',
			scope: true,
			link: function postLink(scope, element, attrs) {

				// canceling edit
				element.on('click', '.stopEdit', function(){
					scope.artwork = angular.copy(scope.artwork_default);
					scope.$apply(function(){
						scope.newArtwork.show = false;
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
