"use strict";

angular.module('bahmni.warehouse').controller('price_listController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'priceListService',
            function($scope, $rootScope, $stateParams, $state, $q,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, priceListService) {


                var init = function() {
                $scope.item = {};
                getPriceList();
                };

                 $scope.reset = function() {
                      $scope.item = {};
                      $scope.form.$setPristine();
                                        }

                var getPriceList = function (){
                    spinner.forPromise(
                    priceListService.getPriceList().then(function(response) {
                     console.log(response.data);
                     $scope.priceLists = response.data;
                      }));

                }

                $scope.setItemPrice = function (){
                console.log($scope.item);
                if($scope.item.defaultPrice)
                var defaultPriceList = 1;
                else
                var defaultPriceList = 0;
                  spinner.forPromise(
                priceListService.createPriceList($scope.item.priceName, defaultPriceList).then(function(response) {
                              console.log(response.data);
                                if(response.data == "updated")
                               {
                               messagingService.showMessage('info', "{{'WAREHOUSE_SAVE_SUCCESS_MESSAGE_KEY' | translate}}");
                                getPriceList();

                              }
                            }));
                $scope.reset();

                }


                    init();
                }
            ]);