'use strict';

// this service provides methods regarding Materials of artworks

angular.module('artApp')
	.service('Materials', function (config, $http) {

		var materials = {};
		var apiPath = config.apiRoot;
		var materialApi = apiPath + '/materials';

		// get all materials and their info
		materials.getAll = function(){

		};

		// get single material info
		materials.get = function(materialId){

		};

		// create a new material
		materials.create = function(materialData){

		};

		return materials;

});