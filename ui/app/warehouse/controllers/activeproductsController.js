"use strict";

angular.module('bahmni.warehouse').controller('activeproductsController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',"$filter",
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'priceListService', 'ledgerEntryService', 'getItemsService',
            function($scope, $rootScope, $stateParams, $state, $q,$filter,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, priceListService,ledgerEntryService,getItemsService) {


                var init = function() {
                    $scope.item={};
                };

                $scope.reset = function() {
                                  $scope.item = {};
                                  $scope.form.$setPristine();
                                             }


                $scope.save_active = function (){

                getItemsService.updateStatus( $scope.item.item_id, $scope.item.status).then(function(response) {
                                   console.log(response);
                                 messagingService.showMessage('info', "{{'SAVE'}}");
                                 $state.go("activateProducts");
                                     })

                $scope.reset();

                }


                 $scope.search = function (){
                                 var name = $scope.item.searchItem ;
                    spinner.forPromise(
                    getItemsService.getItem(name).then(function(response) {
                    console.log(response);
                    $scope.getItems = response.data;

                                        }));

                                            }





                    init();
                }
            ]);