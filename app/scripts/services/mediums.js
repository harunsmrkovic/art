'use strict';

// this service will provide methods regarding Mediums of artworks

angular.module('artApp')
	.service('Mediums', function (config, $http) {

		var mediums = {};
		var apiPath = config.apiRoot;
		var mediumApi = apiPath + '/mediums';

		// get all mediums and their info
		mediums.getAll = function(){

		};

		// get single medium info
		mediums.get = function(mediumId){

		};

		return mediums;
	
	});