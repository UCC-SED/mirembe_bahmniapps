"use strict";

angular.module('bahmni.cashier').controller('ordersController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler', '$bahmniCookieStore','ngDialog','getSaleOrdersService',
            function($scope, $rootScope, $stateParams, $state, $q,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore,ngDialog,getSaleOrdersService) {
                $scope.devShow = null;
                $scope.gTotal = 0;
                var init = function() {
                getOrders();
                };

                var getOrders = function (){
                var search = '';
                   spinner.forPromise(
                    getSaleOrdersService.getOrders(search).then(function(response) {
                    console.log(response.data );
                     $scope.orders = response.data;
                                        }));



                }
            $scope.search = function (){
              spinner.forPromise(
              getSaleOrdersService.getOrders($scope.searchName).then(function(response) {
              console.log(response.data );
              $scope.orders = response.data;
                  }));

            }

                $scope.getOrderLines = function(oder_id, fullName,discount) {
                            console.log(oder_id);
                            $scope.fullName = fullName;
                            $scope.oder_id = oder_id;
                            $scope.discount = discount;
                            spinner.forPromise(
                           getSaleOrdersService.getOrdersLines(oder_id).then(function(response) {
                                $scope.orderLines = response.data;
                                    getTotalSum($scope.orderLines);
                                ngDialog.open({
                                    template: 'views/orderLines.html',
                                    scope: $scope
                                });
                                return;

                            }))
                        };

                   $scope.cancelOrder = function(oder_id) {
                     console.log(oder_id);
                          spinner.forPromise(
                            getSaleOrdersService.cancelOrder(oder_id).then(function(response) {

                                 if(response.data == "updated")
                                     {
                                     messagingService.showMessage('info', "{{'SAVE'}}");
                                   getOrders();
                                     }

                                                    }))
                                                };

                     $scope.confirmPay = function (orderID){
                       spinner.forPromise(
                       getSaleOrdersService.paymentConfirmed(orderID).then(function(response) {
                        if(response.data == "updated")
                                   {
                                    messagingService.showMessage('info', "{{'SAVE'}}");
                                    getOrders();
                                    }

                                                }));

                         };

                    $scope.cancelOrderLine = function(orderlineID,fullName,orderid) {
                         spinner.forPromise(
                           getSaleOrdersService.cancelOrderLine(orderlineID).then(function(response) {

                           $scope.orderLines = response.data;
                           if(response.data == "updated")
                                 {
                                   messagingService.showMessage('info', "{{'SAVE'}}");
                                   $scope.getOrderLines(orderid,fullName);
                                   getOrders();

                                }

                           }))
                            };

                var getTotalSum = function(orderLines){
                $scope.total = 0;
                orderLines.forEach(function(orderLine)
                           {
                      $scope.total = $scope.total +   orderLine.amount * orderLine.qty;
                          })


                }

                    init();
                }
            ]);