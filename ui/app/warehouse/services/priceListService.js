'use strict';
angular.module('bahmni.warehouse')
    .factory('priceListService', ['$http', function($http) {

        var getPriceList = function() {

            return $http.get(Bahmni.Common.Constants.selectPriceLists, {
                method: "GET",
                withCredentials: true
            });
        };



      var createPriceList = function(name, defaultPrice) {
            var params = {
                name: name,
                defaulted: defaultPrice
            };
            return $http.get(Bahmni.Common.Constants.insertPriceList, {
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