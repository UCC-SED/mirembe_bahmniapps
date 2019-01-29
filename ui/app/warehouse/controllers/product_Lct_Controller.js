"use strict";

angular.module('bahmni.warehouse').controller('product_Lct_Controller', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',"$filter",
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'productsLctService',
            function($scope, $rootScope, $stateParams, $state, $q,$filter,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, productsLctService) {


                var init = function() {
                    $scope.item={};
                    getproductLocationList();
                };

                    var getproductLocationList = function (){
                    spinner.forPromise(
                    productsLctService.getproductLocationList().then(function(response) {
                     console.log(response.data);
                     $scope.productLocationList = response.data;
                      }));

                }
			 
			 $scope.save_location= function (){
             console.log($scope.item);
               spinner.forPromise(
                productsLctService.createLocation($scope.item.person_id,$scope.item.location_id).then(function(response) {
                       if(response.data == "inserted")
                         {
                          messagingService.showMessage('info', "{{'SAVE'}}");
                           getproductLocationList();
                         }

                         }));
                      //  $scope.reset();
                      };
					  
               $scope.getproductLists = function (){
                spinner.forPromise(
                productsLctService.getLocationList(id1, p_id, l_id).then(function(response) {
                      console.log(response);
                      $scope.getproductLists = response.data;

                           }));
                    }
                    init();
                }
            ]);