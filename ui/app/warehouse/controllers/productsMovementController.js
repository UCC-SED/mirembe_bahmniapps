"use strict";

angular.module('bahmni.warehouse').controller('productsMovementController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'getItemsService',
            function($scope, $rootScope, $stateParams, $state, $q,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, getItemsService) {

                $scope.devShow = null;

                var init = function() {
                getItems();

                };


            $scope.reset = function() {
                  $scope.item = {};
                  $scope.form.$setPristine();
                                       }

               var getItems = function(){
                spinner.forPromise(
                            getItemsService.getConcept("Dose Quantity Units").then(function(response) {
                          console.log(response.data.results[0].setMembers );
                          $scope.dosageForms = response.data.results[0].setMembers;
                            }));
                        }

            $scope.save_item = function (){
            console.log($scope.item);
               spinner.forPromise(
                getItemsService.createdrug_requestOrder($scope.item.name, $scope.item.item_id, $scope.item.qty_req, $scope.item.price_listId).then(function(response) {
                       if(response.data == "updated")
                         {
                          messagingService.showMessage('info', "{{'SAVE'}}");
                         //  $state.go("products");
                           getItems();
                         }

                         }));
                $scope.reset();
                                         };

                $scope.search = function (){
                     var name = $scope.searchName ;
                     spinner.forPromise(
                     getItemsService.SearchItem(name).then(function(response) {
                       console.log(response);
                              $scope.Itemss = response.data;

                                    }));

                               }


                    init();
                }
            ]);