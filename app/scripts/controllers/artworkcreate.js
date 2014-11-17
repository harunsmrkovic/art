'use strict';

/**
 * @ngdoc function
 * @name artApp.controller:ArtworkcreateCtrl
 * @description
 * # ArtworkcreateCtrl
 * Controller of the artApp
 */
angular.module('artApp')
	.controller('ArtworkCreateCtrl', function ($scope, $log, Artworks, Mediums, Materials) {

		$scope.artwork_default = {
			title: '',
			artist: '',
			description: '',
			dimension1: 0,
			dimension2: 0,
			dimension3: 0,
			includes_vat: true,
			dimensions_in_cm: true,
			materialsData: []
		};

		$scope.artwork = angular.copy($scope.artwork_default);

		Mediums.getAll().then(function(mediums){
			$scope.mediums = mediums;
		});

		// we have to watch for changes and apply them to API-friendly property
		$scope.$watch('artwork.mediumData', function(){
			if(typeof $scope.artwork.mediumData !== 'undefined'){
				$scope.artwork.medium = $scope.artwork.mediumData.url;
			}
		});

		$scope.updateOrCreateArtwork = function(){
			Artworks.create($scope.artwork)
			.then(function(createdArtwork){
				$scope.artworks.unshift(createdArtwork);
				$scope.newArtwork.show = false;
				if(createdArtwork.materialsData.length > 0){
					angular.forEach(createdArtwork.materialsData, function(newMaterial){
						Artworks.attachMaterial(createdArtwork.id, newMaterial);
					});
				}
			},
			function(){
				// sorry for using alert :(
				alert('You have to fill in everything');
			});
		};

		$scope.addMaterialAndAttach = function(){
			var materialData = {name: $scope.addMaterialName};
			Materials.create(materialData)
			.then(
				function(createdMaterial){
					$scope.addMaterialName = '';
					$scope.artwork.materialsData.push(createdMaterial);
				});
		};

		$scope.detachMaterial = function(material){
			$scope.artwork.materialsData.splice($scope.artwork.materialsData.indexOf(material), 1);
		};

	});
