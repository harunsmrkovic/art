'use strict';

// this service will provide methods regarding Mediums of artworks

angular.module('artApp')
	.service('Mediums', function (config, $filter, $http, $q) {

		var mediums = {};
		var apiPath = config.apiRoot;
		
		mediums.api = apiPath + '/mediums';

		// get all mediums and their info
		mediums.getAll = function(){
			var defer = $q.defer();

			$http.get(mediums.api)
			.success(function(data){
				var mediumsUrls = data.urls,
						fetchMediums = [],
						returnMediums = [];

				if(mediumsUrls.length > 0){
					angular.forEach(mediumsUrls, function(mediumUrl){
						fetchMediums.push(mediums.get(mediumUrl));
					});

					if(fetchMediums.length > 0){
						$q.all(fetchMediums).then(
							function(mediumsRaw){
								angular.forEach(mediumsRaw, function(medium){
									returnMediums.push(medium.data);
								});
								defer.resolve(returnMediums);
							},
							function(error){
								defer.reject(error);
							}
						);
					}
					else {
						defer.resolve(returnMediums);
					}
				}
				else {
					defer.resolve(returnMediums);
				}
			})
			.error(function(error){
				defer.reject(error);
			});

			return defer.promise;
		};

		// get single medium info
		mediums.get = function(mediumId){

			mediumId = $filter('idExtractor')(mediumId);
			return $http.get([mediums.api, mediumId].join('/'), {cache: true});

		};

		return mediums;
	
	});