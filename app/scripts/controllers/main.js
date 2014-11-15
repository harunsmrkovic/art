'use strict';

// this is the main controller, all browse logic will reside here

angular.module('artApp')
	.controller('MainCtrl', function ($scope, Artworks, Mediums, Materials, $log) {
		
		console.group('Artworks Service tests');
		$log.info('Get all');
		
		Artworks.getAll()
		.then(function(artworks){
			$log.info('artworks', artworks);
		},
		function(errors){
			$log.warn(errors);
		});
		console.groupEnd();

		console.group('Mediums Service tests');
		$log.info('Get all', Mediums.getAll());
		console.groupEnd();

		console.group('Materials Service tests');
		$log.info('Get all', Materials.getAll());
		console.groupEnd();

	});
