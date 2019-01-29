'use strict';
angular.module('bahmni.warehouse')
    .factory('productsLctService',['$http', function($http) {

        var getproductLocationList = function() {

            return $http.get("https://192.168.33.10/openmrs/ws/rest/v1/get_item/location_mapping", {
                method: "GET",
                withCredentials: true
            });
        };
		
		var createLocation = function(person_id, location_id) {
            var params = {
                personID: person_id,
                locationID: location_id

            };
            return $http.get("https://192.168.33.10/openmrs/ws/rest/v1/get_item/createLocation", {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };
		
		
        /*var getLocationList = function(l_id,person_id, location_id) {
            var params = {
               id:l_id,
               personID: person_id,
               locationID:location_id
                 
				 };

            return $http.get("https://192.168.33.10/openmrs/ws/rest/v1/get_item/editLocation", {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };*/
		
        return {
            getproductLocationList: getproductLocationList,
			createLocation:createLocation,
			getLocationList :getLocationList 
        };
    }]);