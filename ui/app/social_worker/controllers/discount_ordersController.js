"use strict";

angular.module('bahmni.socialWorker').controller('discount_ordersController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore','ngDialog','getSaleOrdersService',
            function($scope, $rootScope, $stateParams, $state, $q,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore,ngDialog,getSaleOrdersService) {
                $scope.devShow = null;
                var init = function() {
                getDiscountOrders();
                };


                var getDiscountOrders = function (){
                                  var search = '';
                                     spinner.forPromise(
                                      getSaleOrdersService.getDiscountOrders(search).then(function(response) {
                                      console.log(response.data );
                                       $scope.orders = response.data;
                                                          }));



                                  };

                   $scope.getOrderLines = function(oder_id, fullName,discount) {
                                            console.log(oder_id);
                                            spinner.forPromise(
                                           getSaleOrdersService.getConcept("Select Exemption Category").then(function(response) {
                                           console.log(response.data.results[0].answers );
                                           $scope.exemptions = response.data.results[0].answers;
                                            $scope.fullName = fullName;
                                            $scope.oder_id = oder_id;
                                            $scope.discount = discount;
                                            spinner.forPromise(
                                           getSaleOrdersService.getSalesOrders_line_other(oder_id).then(function(response) {
                                           $scope.orderLines = response.data;
                                           getTotalSum($scope.orderLines);
                                             ngDialog.open({
                                              template: 'views/orderLines_cancelled.html',
                                              scope: $scope
                                                });
                                                return;

                                            }))
                                            }));
                                        };

                $scope.getDiscountsearch = function (){
                     var search = $scope.searchName;
                     spinner.forPromise(
                       getSaleOrdersService.getDiscountOrders(search).then(function(response) {
                          console.log(response.data );
                               $scope.orders = response.data;
                                             }));
                                                  };

                    init();
                }
            ]);