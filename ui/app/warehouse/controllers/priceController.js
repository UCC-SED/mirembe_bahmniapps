"use strict";

angular.module('bahmni.warehouse').controller('priceController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',"$filter",
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'priceListService', 'priceItemService', 'getItemsService',
            function($scope, $rootScope, $stateParams, $state, $q,$filter,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, priceListService,priceItemService,getItemsService) {


                var init = function() {
                    $scope.item={};
                    getPriceList();
                };

             $scope.reset = function() {
                      $scope.item = {};
                      $scope.form.$setPristine();
                                }

                var getPriceList = function (){
                                    spinner.forPromise(
                                    priceListService.getPriceList().then(function(response) {

                                     $scope.priceLists = response.data;

                                     }));

                                }

                $scope.save_price = function (){

                                spinner.forPromise(
                                 priceItemService.createPriceItem($scope.item.item_id, $scope.item.pricelist, $scope.item.amount).then(function(response) {
                                   if(response.data == "updated")
                                                                {
                                                                messagingService.showMessage('info', "{{'SAVE'}}");
                                                                getPriceList();
                                                                 }
                                                     }));
                                          $scope.reset();

                                               };

                                $scope.search = function (){

                                spinner.forPromise(
                                 priceItemService.selectPriceItem($scope.searchPrice).then(function(response) {

                                 $scope.getPrices = response.data;

                                                     }));

                                               }


                    init();
                }
            ]);