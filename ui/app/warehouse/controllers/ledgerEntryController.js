"use strict";

angular.module('bahmni.warehouse').controller('ledgerEntryController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',"$filter",
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'priceListService', 'ledgerEntryService',
            function($scope, $rootScope, $stateParams, $state, $q,$filter,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, priceListService,ledgerEntryService) {


                var init = function() {
                $scope.item = {};
                getPriceList();
                getLedgers();
                };

                var getPriceList = function (){
                    spinner.forPromise(
                    priceListService.getPriceList().then(function(response) {

                     $scope.priceLists = response.data;

                     }));

                }
                $scope.search = function (){
                 var name = $scope.item.searchLedger ;
                 var batchNo = "";
                 var invNo = "";
                  spinner.forPromise(
                                  ledgerEntryService.getLedger(name, batchNo, invNo).then(function(response) {
                                       console.log(response);
                                       $scope.getLedgers = response.data;

                                     }));

                }


                 var getLedgers = function (){
                 var name = "";
                 var batchNo = "";
                 var invNo = "";
                spinner.forPromise(
                 ledgerEntryService.getLedger(name, batchNo, invNo).then(function(response) {
                      console.log(response);
                      $scope.getLedgers = response.data;

                                     }));

                                }

               $scope.reset = function() {
                  $scope.item = {};
                  $scope.form.$setPristine();
                                    }

                $scope.save_ledger = function (){
                  console.log($scope.item);
                  $scope.item.expiryDate = $filter('date')($scope.item.expiryDate, "yyyy-MM-dd");
                  $scope.item.receiveDate = $filter('date')($scope.item.receiveDate, "yyyy-MM-dd");
                   var math = "-";
                     $scope.item.amount=1;
                  if($scope.item.ledger_type.indexOf("-ve") !== -1){

                  $scope.item.quantity =  $scope.item.quantity * -1;
                  }

                 spinner.forPromise(

                ledgerEntryService.createLedgerEntry($scope.item.drug_id, $scope.item.ledger_type, $scope.item.quantity,
                 $scope.item.batchNo, $scope.item.invoice, $scope.item.expiryDate,$scope.item.receiveDate,
                 $scope.item.pricelist,$scope.item.amount, math).then(function(response) {
                            console.log(response.data);
                                if(response.data == "updated")
                               {
                               messagingService.showMessage('info', "{{'SAVE'}}");
                                getPriceList();
                                getLedgers();
                                }


                                }));
                  $scope.reset();
                }


                    init();
                }
            ]);