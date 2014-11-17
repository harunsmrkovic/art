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

				// changing measure between CM and INCH
				element.on('click', '.measure', function(){
					var setMeasure = angular.element(this).data('measure');
					scope.$apply(function(){
						scope.artwork.dimensions_in_cm = (setMeasure === 'cm') ? true : false;
					});
				});

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
