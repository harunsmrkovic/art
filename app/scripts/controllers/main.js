'use strict';

// this is the main controller, all browse logic will reside here

angular.module('artApp')
	.controller('MainCtrl', function ($scope, Artworks, $log) {
		
		$scope.loadingArtworks = true;

		Artworks.getAll().then(function(artworks){

			$scope.artworks = artworks;
			$scope.loadingArtworks = false;

		},
		function(errors){

			$log.warn(errors);

		});

		// deleting artwork
		$scope.destroyArtwork = function(artwork){

			Artworks.destroy(artwork.id)
			.success(function(){
				$scope.artworks.splice($scope.artworks.indexOf(artwork), 1);
			});

		};

	});
