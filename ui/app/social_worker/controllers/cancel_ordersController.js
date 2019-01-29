"use strict";

angular.module('bahmni.socialWorker').controller('cancel_ordersController', ['$scope',
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

                $scope.getCancelsearch = function (){
                                 var search = $scope.searchName;
                     spinner.forPromise(
                       getSaleOrdersService.getCancelledorders(search).then(function(response) {
                          console.log(response.data);
                               $scope.orders = response.data;
                                             }));
                                                  };

                    init();
                }
            ]);