'use strict';

// general controls regarding artworks

angular.module('artApp')
  .controller('ArtworkEditCtrl', function ($scope, Artworks, Mediums, Materials) {

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

		$scope.updateArtwork = function(artwork){
			Artworks.update(artwork);
		};

  });
