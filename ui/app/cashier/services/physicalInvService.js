'use strict';
angular.module('bahmni.warehouse')
    .factory('physicalInvService', ['$http', function($http) {




      var createPysicalInv = function(item_id, price_list_id, quantity) {
            var params = {
                item_id: item_id,
                priceList: price_list_id,
                quantity: quantity

            };
            return $http.get(Bahmni.Common.Constants.insertPhysical, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

         var selectPysicalInv = function(name) {
                    var params = {
                        name: name

                    };
                    return $http.get(Bahmni.Common.Constants.selectPhysical, {
                        method: "GET",
                        params: params,
                        withCredentials: true
                    });
                };





        return {
            createPysicalInv: createPysicalInv,
             selectPysicalInv: selectPysicalInv
        };
    }]);