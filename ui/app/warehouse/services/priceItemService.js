'use strict';
angular.module('bahmni.warehouse')
    .factory('priceItemService', ['$http', function($http) {




      var createPriceItem = function(item_id, price_list_id, amount) {
            var params = {
                item_id: item_id,
                priceList: price_list_id,
                amount: amount

            };
            return $http.get(Bahmni.Common.Constants.insertPrice, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

         var selectPriceItem = function(name) {
                    var params = {
                        name: name

                    };
                    return $http.get(Bahmni.Common.Constants.selectPrice, {
                        method: "GET",
                        params: params,
                        withCredentials: true
                    });
                };





        return {
            createPriceItem: createPriceItem,
             selectPriceItem: selectPriceItem
        };
    }]);