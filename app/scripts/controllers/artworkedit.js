'use strict';

// general controls regarding artworks

angular.module('artApp')
  .controller('ArtworkEditCtrl', function ($scope, $log, Artworks, Mediums, Materials) {

    // populate scope with all mediums available
		Mediums.getAll().then(function(mediums){
			$scope.mediums = mediums;

			// we have to make a reference to the selected medium from mediums array...
			// http://jsfiddle.net/qWzTb/ from official angularjs docs... hate this way though
			var i = 0;
			angular.forEach(mediums, function(medium){
				if(medium.id === $scope.artwork.mediumData.id){
					$scope.artwork.mediumData = $scope.mediums[i];
				}
				i++;
			});
		});

		// we have to watch for changes and apply them to API-friendly property
		$scope.$watch('artwork.mediumData', function(){
			$scope.artwork.medium = $scope.artwork.mediumData.url;
		});

		// fire an update request
		$scope.updateArtwork = function(){
			Artworks.update($scope.artwork)
			.success(function(){
				$scope.artwork.inEdit = false;
			})
			.error(function(error){
				$log.error(error);
			});
		};

		$scope.addMaterialAndAttach = function(){
			var materialData = {name: $scope.addMaterialName};
			Materials.create(materialData)
			.then(
				function(createdMaterial){
					Artworks.attachMaterial($scope.artwork.id, createdMaterial)
					.success(function(){
						$scope.addMaterialName = '';
						$scope.artwork.materialsData.push(createdMaterial);
					});
				});
		};

		$scope.detachMaterial = function(material){
			Artworks.detachMaterial($scope.artwork.id, {url: material.url})
			.success(function(){
				$scope.artwork.materialsData.splice($scope.artwork.materialsData.indexOf(material), 1);
			});
		};

  });
