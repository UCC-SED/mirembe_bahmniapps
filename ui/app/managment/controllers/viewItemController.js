"use strict";

angular.module('bahmni.managment').controller('ViewItemController', ['$scope',
    '$rootScope', '$stateParams', '$state', '$q',
    'orderTypeService', 'sessionService', 'encounterService',
    'spinner', 'messagingService', 'appService', '$anchorScroll',
    'contextChangeHandler',
    '$bahmniCookieStore', 'offlineService', 'itemService',
    function($scope, $rootScope, $stateParams, $state, $q,
        orderTypeService, sessionService, encounterService, spinner,
        messagingService, appService, $anchorScroll,
        contextChangeHandler, $bahmniCookieStore, offlineService, itemService) {
        //$scope.item = appService.getAppDescriptor().getExtensions('org.bahmni.managment.' + $rootScope.item) || [];
        var conceptName = $stateParams.conceptName || null;
        $scope.tableInfo = [{
            heading: 'ITEM_NAME',
            sortInfo: 'item.name',
            enable: true
        }, {
            heading: 'ITEM_CATEGORY',
            sortInfo: 'item.category',
            enable: true
        }, {
            heading: 'ITEM_MAPPING',
            sortInfo: 'item.mapping',
            enable: true
        }, {
            heading: 'ITEM_PUBLIC_PRICE',
            sortInfo: 'item.price',
            enable: true
        }, {
            heading: 'ITEM_INSURANCE_PRICE',
            sortInfo: 'item.insurancePrice',
            enable: true
        }];
        $scope.headingNoPrice = [{
            heading: 'ITEM_NAME',
            sortInfo: 'item.name',
            enable: true
        }, {
            heading: 'ITEM_CATEGORY',
            sortInfo: 'item.category',
            enable: true
        }, {
            heading: 'ITEM_MAPPING',
            sortInfo: 'item.mapping',
            enable: true
        }];
        $scope.itemCategory = ["Drug", "LabTest", "Diagnosis", "Radiology"];
        $scope.item = {};
        $scope.showTableWithPrice = false;
        $scope.showTableWithNoPrice = false;
        $scope.showEditButton = false;
        var init = function() {
            if (!(conceptName === 'defaultValue')) {
                $scope.searchItemByName(conceptName);
            }
        };

        $scope.searchItemByName = function(searchName) {

            spinner.forPromise(
                itemService.getItem(searchName).then(function(response) {
                    console.log(response);
                    $scope.item = response;
                    $scope.showEditButton = true;

                    if (response.itemCategory === "Diagnosis") {
                        $scope.showTableWithNoPrice = true;
                        $scope.showTableWithPrice = false;

                    } else {
                        $scope.showTableWithPrice = true;
                        $scope.showTableWithNoPrice = false;
                    }
                }));
        };

        $scope.searchItemByCategory = function(categoryName) {

            spinner.forPromise(
                itemService.getItemsByCategory(categoryName).then(function(response) {
                    console.log(response);
                    $scope.item = response;
                    console.log(categoryName);
                    if (categoryName === "Diagnosis") {
                        $scope.showTableWithNoPrice = true;
                        $scope.showTableWithPrice = false;
                    } else {
                        $scope.showTableWithPrice = true;
                        $scope.showTableWithNoPrice = false;
                    }
                }));
        };

        $scope.editItem = function() {
            console.log($scope.item);
            $state.go("editItem", {
                concept: $scope.item
            });
        }

        $scope.createItem = function() {
            $state.go("newItem");
        }

        init();
    }
]);