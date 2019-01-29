"use strict";

angular.module('bahmni.warehouse').controller('physical_inventController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',"$filter",
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'priceListService', 'physicalInvService', 'getItemsService',
            function($scope, $rootScope, $stateParams, $state, $q,$filter,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, priceListService,physicalInvService,getItemsService) {

            $scope.searchInv.byDate="";
            $scope.searchInv.byBatch="";
            $scope.searchInv.ByName="";
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

                $scope.savePhyicalInv = function (){
                        $scope.item.receivedDate = $filter('date')($scope.item.receivedDate, "yyyy-MM-dd");
                        $scope.item.recorededDate = $filter('date')($scope.item.recorededDate, "yyyy-MM-dd");
                                spinner.forPromise(
                                 physicalInvService.createPysicalInv($scope.item.item_id, $scope.item.pricelist, $scope.item.quantity,
                                  $scope.item.receivedDate,$scope.item.recorededDate, $scope.item.batch).then(function(response) {
                                   if(response.data == "updated")
                                                                {
                                            messagingService.showMessage('info', "{{'SAVE'}}");
                                            $state.go("physical_invent");
                                                                 }

                                                     }));
                                    $scope.reset();

                                               }

               $scope.search = function (){
                 spinner.forPromise(
                   physicalInvService.selectPysicalInv($scope.searchInv.ByName,$scope.searchInv.byDate,$scope.searchInv.byBatch).then(function(response) {
                    console.log(response);
                    $scope.getInvs = response.data;
                                           }));
                                        }


                    init();
                }
            ]);