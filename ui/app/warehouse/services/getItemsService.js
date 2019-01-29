'use strict';
angular.module('bahmni.warehouse')
    .factory('getItemsService', ['$http', function($http) {

        var getItem = function(name) {
            var params = {
               name: name
                            };

            return $http.get(Bahmni.Common.Constants.getItems_unfiltered, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

      var outOfStock = function() {


                 return $http.get(Bahmni.Common.Constants.outOfStockUrl, {
                     method: "GET",
                     withCredentials: true
                 });
             };

     var updateStatus = function(name,status) {
                    var params = {
                       drug_id: name,
                       status: status
                                 };

                    return $http.get(Bahmni.Common.Constants.updateStatusad, {
                        method: "GET",
                        params: params,
                        withCredentials: true
                    });
                };

     var createItem = function (name,category,strength,dosageForm){
         var params = {
               name: name,
               category: category,
               strength: strength,
               dosageForm: dosageForm
                        };

               return $http.get(Bahmni.Common.Constants.createItem, {
                      method: "GET",
                      params: params,
                      withCredentials: true
                            });

        };

        var SearchItem = function (name){
         var params = {
               name: name
                        };

               return $http.get(Bahmni.Common.Constants.getAddItems, {
                      method: "GET",
                      params: params,
                      withCredentials: true
                            });

        };

        var getConcept = function(conceptName) {
                   return $http.get(Bahmni.Common.Constants.conceptSearchByFullNameUrl +
                       "&name=" + conceptName +
                       "&v=full", {cache: true});
                                              };


        return {
            getItem: getItem,
            updateStatus: updateStatus,
            createItem: createItem,
            SearchItem: SearchItem,
            outOfStock: outOfStock,
            getConcept: getConcept
        };
    }]);