"use strict";

angular.module('bahmni.managment').controller('AddPriceController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'itemService',
            function($scope, $rootScope, $stateParams, $state, $q,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, itemService) {
            //    $scope.item = appService.getAppDescriptor().getExtensions('org.bahmni.managment.' + $rootScope.item) || [];
                var conceptUuid = $stateParams.conceptUuid;
                var conceptName = $stateParams.conceptName;
                $scope.customHeader = "Price Setup";
                $scope.buttonLabel = "Add Price";
                $scope.items = ["Drug", "Laboratory Test", "Diagnosis", "Radiology"];
                $scope.drugSourceCategory = ["MSD CODE"];
                console.log(conceptUuid);
                console.log(conceptName);
            //    var configs = appService.getAppDescriptor().getConfigValue("config") || {};
             //   console.log(configs);

                var init = function() {

                };

                 $scope.setItemPrice = function(itemPrice) {
                        spinner.forPromise(
                            itemService.setItemPrice(itemPrice, conceptUuid).then(function(response) {
                                console.log(response.data);
                                if(response.data.status)
                                {
                                 messagingService.showMessage('info', "{{'MANAGMENT_SAVE_SUCCESS_MESSAGE_KEY' | translate}}");
                                $state.go("viewItem", {conceptName: conceptName});

                                }
                            }));
                    

                    };

              

                    init();
                }
            ]);