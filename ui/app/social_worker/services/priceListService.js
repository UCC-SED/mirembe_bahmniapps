'use strict';
angular.module('bahmni.socialWorker')
    .factory('priceListService', ['$http', function($http) {

        var getPriceList = function() {

            return $http.get("https://192.168.33.10/openmrs/ws/rest/v1/pricelist/selectPriceLists", {
                method: "GET",
                withCredentials: true
            });
        };



      var createPriceList = function(name, defaultPrice) {
            var params = {
                name: name,
                defaulted: defaultPrice
            };
            return $http.get("https://192.168.33.10/openmrs/ws/rest/v1/pricelist/insertPriceList", {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };



        return {
            getPriceList: getPriceList,
            createPriceList: createPriceList
        };
    }]);