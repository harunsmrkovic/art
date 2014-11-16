'use strict';

// this is the main controller, all browse logic will reside here

angular.module('artApp')
	.controller('MainCtrl', function ($scope, Artworks, Mediums, Materials, $log) {
		
		$scope.loadingArtworks = true;
		Artworks.getAll().then(function(artworks){
			$scope.artworks = artworks;
			$scope.loadingArtworks = false;
		},
		function(errors){
			$log.warn(errors);
		});

		// populate scope with all mediums available
		Mediums.getAll().then(function(allMediums){
			$scope.allMediums = allMediums;
		});

	});
