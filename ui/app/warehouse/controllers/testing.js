"use strict";

angular.module('bahmni.warehouse').controller('productsMvtController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'productsMvtService',
            function($scope, $rootScope, $stateParams, $state, $q,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, productsMvtService) {
					
                var init = function() {
                $scope.item = {};
                getproductMvtList();
                };

                 $scope.reset = function() {
                      $scope.item = {};
                      $scope.form.$setPristine();
                                        }

                var getproductMvtList = function (){
                    spinner.forPromise(
                    productsMvtService.getproductMvtList().then(function(response) {
                     console.log(response.data);
                     $scope.productMvtList = response.data;
                      }));

                }



                    init();
                }
            ]);