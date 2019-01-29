"use strict";

angular.module('bahmni.cashier').controller('cancel_ordersController', ['$scope',
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
                $scope.devShow = null;
                $scope.gTotal = 0;
                var init = function() {
                getCancelOrders();
                };

                var getCancelOrders = function (){
                                  var search = '';
                                     spinner.forPromise(
                                      getSaleOrdersService.getCancelledorders(search).then(function(response) {
                                      console.log(response.data );
                                       $scope.orders = response.data;
                                                          }));
                                  };
                $scope.getOrderLines = function(oder_id, fullName,discount) {
                         console.log(oder_id);
                         $scope.fullName = fullName;
                         $scope.oder_id = oder_id;
                         $scope.discount = discount;
                         spinner.forPromise(
                         getSaleOrdersService.getSalesOrders_line_other(oder_id).then(function(response) {
                          $scope.orderLines = response.data;
                           getTotalSum($scope.orderLines);
                           ngDialog.open({
                            template: 'views/orderLines_paid.html',
                                scope: $scope
                                    });
                                       return;

                                           }))
                                                        };

                var getTotalSum = function(orderLines){
                          $scope.total = 0;
                          orderLines.forEach(function(orderLine)
                               {
                                $scope.total = $scope.total +   orderLine.amount * orderLine.qty;
                                })
                                                    };

                $scope.getCancelsearch = function (){
                                 var search = $scope.searchName;
                     spinner.forPromise(
                       getSaleOrdersService.getCancelledorders(search).then(function(response) {
                          console.log(response.data );
                               $scope.orders = response.data;
                                             }));
                                                  };

                    init();
                }
            ]);