"use strict";

angular.module('bahmni.managment').controller('NewItemController', ['$scope',
            '$rootScope', '$stateParams', '$state', '$q',
            'orderTypeService', 'sessionService', 'encounterService',
            'spinner', 'messagingService', 'appService', '$anchorScroll',
            'contextChangeHandler',
            '$bahmniCookieStore', 'offlineService', 'itemService',
            function($scope, $rootScope, $stateParams, $state, $q,
                orderTypeService, sessionService, encounterService, spinner,
                messagingService, appService, $anchorScroll,
                contextChangeHandler, $bahmniCookieStore, offlineService, itemService) {
                $scope.item = appService.getAppDescriptor().getExtensions('org.bahmni.managment.' + $rootScope.item) || [];
                $scope.customHeader = "New Item";
                $scope.buttonLabel = "";
                $scope.items = ["Drug", "LabTest", "Diagnosis", "Radiology"];
                $scope.drugSourceCategory = ["MSD CODE"];
                $scope.labSourceCategory = ["LAB CODE"];
                $scope.diagnosisSourceCategory = ["ICD 10 - WHO", "ICD 9 - WHO"];
                $scope.labDepartments = ["HAEMATOLGY", "CYTOLOGY", "SEROLOGY","CLINICAL CHEMISTRIES", "PARASITOLOGY", "MICROBIOLOGY"];
                var configs = appService.getAppDescriptor().getConfigValue("config") || {};
                console.log(configs);

                var init = function() {

                };


                $scope.onItemCategorySelected = function(itemCategory) {
                    $scope.buttonLabel = "Create New " + itemCategory;

                };

                $scope.createNewItem = function(item) {
                    if (item.category === 'Drug') {
                        spinner.forPromise(
                            itemService.createNewDrug(item).then(function(response) {
                                if(response.data.status)
                                {
                                 messagingService.showMessage('info', "{{'MANAGMENT_SAVE_SUCCESS_MESSAGE_KEY' | translate}}");
                                  var params = {conceptUuid: response.data.conceptUuid, conceptName: item.name};
                                 $state.go("addPrice", params);
                                }
                            }));
                        }else if(item.category === 'Laboratory Test')
                        {
                             spinner.forPromise(
                            itemService.createNewLabTest(item).then(function(response) {
                                if(response.data.status)
                                {
                                 messagingService.showMessage('info', "{{'MANAGMENT_SAVE_SUCCESS_MESSAGE_KEY' | translate}}");
                                  var params = {conceptUuid: response.data.conceptUuid, conceptName: item.name};
                                 $state.go("addPrice", params);
                                }
                            }));

                        }else if(item.category === 'Diagnosis')
                        {
                             spinner.forPromise(
                            itemService.createNewConcept(item, "N/A").then(function(response) {
                                if(response.data.status)
                                {
                                 messagingService.showMessage('info', "{{'MANAGMENT_SAVE_SUCCESS_MESSAGE_KEY' | translate}}");
                                  var params = {conceptUuid: response.data.conceptUuid, conceptName: item.name};
                                 $state.go("viewItem", params);
                                }
                            }));

                        }

                    };

                    init();
                }
            ]);