"use strict";

angular.module('bahmni.warehouse').controller('out_of_stockController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',"$filter",
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'priceListService',  'getItemsService',
            function($scope, $rootScope, $stateParams, $state, $q,$filter,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, priceListService,getItemsService) {


                var init = function() {
                    $scope.item={};
                    getItemsList();
                };

                var getItemsList = function (){
                                    spinner.forPromise(
                                    getItemsService.outOfStock().then(function(response) {

                                     $scope.OutOfStockData = response.data;

                                     }));

                                }


                    init();
                }
            ]);