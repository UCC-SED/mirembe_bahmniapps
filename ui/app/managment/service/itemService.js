'use strict';
angular.module('bahmni.managment')
    .factory('itemService', ['$http', function($http) {
        var v = 'custom:(uuid,strength,name,dosageForm,concept:(uuid,name,names:(name)))';
        var search = function(drugName, conceptUuid) {
            var params = {
                v: v,
                q: drugName,
                conceptUuid: conceptUuid,
                s: "ordered"
            };
            return $http.get(Bahmni.Common.Constants.drugUrl, {
                method: "GET",
                params: params,
                withCredentials: true
            }).then(function(response) {
                return response.data.results;
            });
        };

        var createNewDrug = function(drugItem) {
            return $http({
                method: 'POST',
                url: Bahmni.Common.Constants.createDrug,
                data: {
                    "resourceType": "ItemRegistration",
                    "itemDetails": [{
                        "itemMappingCode": drugItem.mappingCode,
                        "itemName": drugItem.name,
                        "itemSourceName": drugItem.sourceCategory
                    }]
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

          var createNewLabTest = function(labItem) {
            return $http({
                method: 'POST',
                url: Bahmni.Common.Constants.createLabTest,
                data: {
                    "resourceType": "ItemRegistration",
                    "itemDetails": [{
                        "itemMappingCode": labItem.mappingCode,
                        "itemName": labItem.name,
                        "itemSourceName": labItem.sourceCategory,
                        "itemDepartmentName": labItem.itemDepartmentName
                    }]
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

            var createNewConcept = function(item, datType) {
            return $http({
                method: 'POST',
                url: Bahmni.Common.Constants.createNewConcept,
                data: {
                    "resourceType": "ItemRegistration",
                    "itemDetails": [{
                        "itemConceptMapCode": item.mappingCode,
                        "itemName": item.name,
                        "itemConceptMapSourceName": item.sourceCategory,
                        "itemDataTypeName": datType,
                        "itemClassName": item.category
                    }]
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };


           var setItemPrice = function(itemPrice, conceptUuid) {
            return $http({
                method: 'POST',
                url: Bahmni.Common.Constants.setItemPrice,
                data: {
                    "resourceType": "ItemRegistration",
                    "itemDetails": [{
                        "itemSalePrice": itemPrice.salePrice,
                        "itemInsurancePrice": itemPrice.insuranceSalePrice,
                        "itemUuid": conceptUuid
                    }]
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };


      var getItem = function(conceptName) {
            var params = {
                conceptName: conceptName
            };
            return $http.get(Bahmni.Common.Constants.getItemUrl, {
                method: "GET",
                params: params,
                withCredentials: true
            }).then(function(response) {
                return response.data;
            });
        };

    var getItemsByCategory = function(categoryName) {
            var params = {
                conceptClassName: categoryName
            };
            return $http.get(Bahmni.Common.Constants.getItemsByCategory, {
                method: "GET",
                params: params,
                withCredentials: true
            }).then(function(response) {
                return response.data;
            });
        };


        return {
            search: search,
            createNewDrug: createNewDrug,
            setItemPrice: setItemPrice,
            getItem: getItem,
            createNewLabTest: createNewLabTest,
            createNewConcept: createNewConcept,
            getItemsByCategory: getItemsByCategory
        };
    }]);