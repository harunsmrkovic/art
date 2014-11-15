'use strict';

// this service hits the Artworks endpoints and provides methods regarding artworks

angular.module('artApp')
	.service('Artworks', function (config, $filter, $http, $q, Materials, Mediums, $log) {

		var artworks = {};
		var apiPath = config.apiRoot;
		var artworkApi = apiPath + '/artworks';

		// fetches all artworks and returns array of fully fetched artworks
		artworks.getAll = function(){
			// promise me you are going to get all of them :)
			var defer = $q.defer();

			// get references to all the artworks
			$http.get(artworkApi)
			.success(function(data){
				var artworksUrls = data.urls,
						returnArtworks = [],
						fetchArtworks = [];

				// traverse the urls and create an array of get request promises!
				angular.forEach(artworksUrls, function(artworkUrl){
					fetchArtworks.push(artworks.get(artworkUrl));
				});

				if(fetchArtworks.length > 0){
					// fetch all artworks!
					$q.all(fetchArtworks)
					.then(
						function(artworksRaw){
							// get what we want in the final array
							angular.forEach(artworksRaw, function(artwork){
								returnArtworks.push(artwork.data);
							});
							// keep up to the promise!
							defer.resolve(returnArtworks);
						},
						function(error){
							// promise not kept :(
							defer.reject(error);
						});
				}
			})
			.error(function(error){
				// promise not kept :((((
				defer.reject(error);
			});

			// delivering outcome of promise!
			return defer.promise;
		};

		// fetches a single artwork and everything related to it (e.g. material and medium info)
		artworks.get = function(artworkId){

			artworkId = $filter('idExtractor')(artworkId);
			return $http.get([artworkApi, artworkId].join('/'));

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

			artworkId = $filter('idExtractor')(artworkId);
			return $http.delete([artworkApi, artworkId].join('/'));

		};

		return artworks;

	});