"use strict";

angular.module('bahmni.managment').controller('EditItemController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'itemService',
            function($scope, $rootScope, $stateParams, $state, $q,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, itemService) {
                //$scope.item = appService.getAppDescriptor().getExtensions('org.bahmni.managment.' + $rootScope.item) || [];
                $scope.item = $stateParams.concept;
               // console.log(concept);
                $scope.customHeader = "Edit Item";
                $scope.buttonLabel = "";
                $scope.items = ["Drug", "Laboratory Test", "Diagnosis", "Radiology"];
                $scope.drugSourceCategory = ["MSD CODE"];
                var configs = appService.getAppDescriptor().getConfigValue("config") || {};
                console.log(configs);

                var init = function() {

                };


                $scope.onItemCategorySelected = function(itemCategory) {
                    $scope.buttonLabel = "Create New " + itemCategory;

                };

                $scope.editItem = function(drugItem) {
                    if (drugItem.category === 'Drug') {
                        spinner.forPromise(
                            itemService.createNewDrug(drugItem).then(function(response) {
                                if(response.data.status)
                                {
                                 messagingService.showMessage('info', "{{'MANAGMENT_SAVE_SUCCESS_MESSAGE_KEY' | translate}}");
                                 console.log(response.data.conceptUuid);
                                  var params = {conceptUuid: response.data.conceptUuid, conceptName: drugItem.name};
                                 $state.go("addPrice", params);
                                }
                            }));
                        }

                    };

                    init();
                }
            ]);