'use strict';

// this service hits the Artworks endpoints and provides methods regarding artworks

angular.module('artApp')
	.service('Artworks', function (config, $http, $q, Materials, Mediums) {

		var artworks = {};
		var apiPath = config.apiRoot;
		var artworkApi = apiPath + '/artworks';

		// fetches all artworks and returns array of fully fetched artworks
		artworks.getAll = function(){

		};

		// fetches a single artwork and everything related to it (e.g. material and medium info)
		artworks.get = function(artworkId){

		};

		// creates a new artwork from an already assembled object
		artworks.create = function(artworkData){

		};

		// updates an existing artwork with new set of data 
		// (important: because of specific API PUT implementation, whole artwork object must be pased on every update, not partial)
		artworks.update = function(artworkId, artworkData){

		};

		// deletes an artwork
		artworks.destroy = function(artworkId){

		};

		return artworks;

	});