'use strict';

// this service provides methods regarding Materials of artworks

angular.module('artApp')
	.service('Materials', function (config, $filter, $http, $q, $log) {

		var materials = {};
		var apiPath = config.apiRoot;

		materials.api = apiPath + '/materials';

		// get all materials and their info
		materials.getAll = function(){
			var defer = $q.defer();

			$http.get(materials.api)
			.success(function(data){
				var materialsUrls = data.urls;
				materials.getList(materialsUrls).then(
					function(fetchedMaterials){
						defer.resolve(fetchedMaterials);
					},
					function(error){
						defer.reject(error);
					});
			})
			.error(function(error){
				defer.reject(error);
			});

			return defer.promise;
		};

		materials.getList = function(materialsUrls){
			var fetchMaterials = [],
					returnMaterials = [];

			var defer = $q.defer();

			if(materialsUrls.length > 0){
				angular.forEach(materialsUrls, function(materialUrl){
					fetchMaterials.push(materials.get(materialUrl));
				});
			
				$q.all(fetchMaterials)
				.then(
					function(materialsRaw){
						angular.forEach(materialsRaw, function(material){
							returnMaterials.push(material.data);
						});
						defer.resolve(returnMaterials);
					},
					function(error){
						defer.reject(error);
					});
			}
			else {
				// return empty arr
				defer.resolve(returnMaterials);
			}

			return defer.promise;
		};

		// get single material info
		materials.get = function(materialId){

			materialId = $filter('idExtractor')(materialId);
			return $http.get([materials.api, materialId].join('/'));

		};

		// create a new material
		materials.create = function(materialData){
			var defer = $q.defer();

			$http.post(materials.api, materialData)
			.success(function(data, status, headers){
				if(status === 201){
					defer.resolve({name: materialData.name, url: headers('Location'), id: $filter('idExtractor')(headers('Location'))});
				}
				else {
					defer.reject('Unknown Status code');
				}
			})
			.error(function(error){
				defer.reject(error);
			});

			return defer.promise;
		};

		return materials;

});