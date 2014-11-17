'use strict';

// this service hits the Artworks endpoints and provides methods regarding artworks

angular.module('artApp')
	.service('Artworks', function (config, $filter, $http, $q, Materials, Mediums, $log) {

		var artworks = {};
		var apiPath = config.apiRoot;
		artworks.api = apiPath + '/artworks';

		// fetches all artworks and returns array of fully fetched artworks
		artworks.getAll = function(){
			// promise me you are going to get all of them :)
			var defer = $q.defer();

			// get references to all the artworks
			$http.get(artworks.api)
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
								returnArtworks.push(artwork);
							});
							// keep up to the promise!
							defer.resolve(returnArtworks);
						},
						function(error){
							// promise not kept :(
							defer.reject(error);
						});
				}
				else {
					defer.resolve(returnArtworks);
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

			var defer = $q.defer();

			artworkId = $filter('idExtractor')(artworkId);
			$http.get([artworks.api, artworkId].join('/'))
			.success(function(artwork){
				// when successfully fetched artwork, fetch all its dependencies now (medium and materials info)
				// first fetch medium
				Mediums.get(artwork.medium)
				.success(function(medium){
						artwork.mediumData = medium;
						// after fetching medium, proceed to fetching all materials info
						artworks.getMaterials(artwork.id).then(
							function(materialsArr){
								artwork.materialsData = materialsArr;
								defer.resolve(artwork);
							},
							function(error){
								defer.reject(error);
							});
				})
				.error(function(error){
					defer.reject(error);
				});

			})
			.error(function(error){
				defer.reject(error);
			});

			return defer.promise;

		};

		// creates a new artwork from an already assembled object
		artworks.create = function(artworkData){

		};

		// updates an existing artwork with new set of data 
		// (important: because of specific API PUT implementation, whole artwork object must be pased on every update, not partial)
		artworks.update = function(artworkData){
			return $http.put([artworks.api, artworkData.id].join('/'), artworkData);
		};

		// deletes an artwork
		artworks.destroy = function(artworkId){

			artworkId = $filter('idExtractor')(artworkId);
			return $http.delete([artworks.api, artworkId].join('/'));

		};

		// fetch all materials for one artwork
		artworks.getMaterials = function(artworkId){
			var defer = $q.defer();
			artworkId = $filter('idExtractor')(artworkId);

			// fetch all materials for this artwork, and then info about each of the materials!
			$http.get([artworks.api, artworkId, 'materials'].join('/'))
			.success(function(materialsUrls){
				// after we have list of all materials, fetch their info
				Materials.getList(materialsUrls.urls).then(
					function(fetchedMaterials){
						defer.resolve(fetchedMaterials);
					},
					function(error){
						defer.reject(error);
					}
				);
			});

			// attach a material to the artwork
			artworks.attachMaterial = function(artworkId, materialData){

				return $http.post([artworks.api, artworkId, 'materials'].join('/'), materialData);

			};

			// detach a material from the artwork
			artworks.detachMaterial = function(artworkId, materialData){

				return $http({
					url: [artworks.api, artworkId, 'materials'].join('/'),
					method: 'DELETE',
					data: materialData
				});

			};

			return defer.promise;
		};

		return artworks;

	});