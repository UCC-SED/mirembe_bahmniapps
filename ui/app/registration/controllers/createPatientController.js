'use strict';

angular.module('bahmni.registration')
    .controller('CreatePatientController', ['$scope', '$rootScope', '$state', 'patientService', 'patient', 'spinner', 'appService', 'messagingService', 'ngDialog', '$q', 'offlineService', 'providerConfig','locationConfig',
        function($scope, $rootScope, $state, patientService, patient, spinner, appService, messagingService, ngDialog, $q, offlineService, providerConfig, locationConfig) {
            var dateUtil = Bahmni.Common.Util.DateUtil;
            $scope.actions = {};
            var errorMessage;
            //var doctorRoomsMapLoginLocation = appService.getAppDescriptor().getConfigValue('doctorRoomsMapLoginLocation');
            var doctorRoomsMapLoginLocation = appService.getAppDescriptor().getConfigValue("doctorRoomsMapLoginLocation").doctorRoomsMapLoginLocationDefinition;
            var configValueForEnterId = appService.getAppDescriptor().getConfigValue('showEnterID');
            $scope.addressHierarchyConfigs = appService.getAppDescriptor().getConfigValue("addressHierarchy");
            $scope.disablePhotoCapture = appService.getAppDescriptor().getConfigValue("disablePhotoCapture");
            $scope.showEnterID = configValueForEnterId === null ? true : configValueForEnterId;
            $scope.today = Bahmni.Common.Util.DateTimeFormatter.getDateWithoutTime(dateUtil.now());
            $scope.assumedBirthDay = appService.getAppDescriptor().getConfigValue("assumedBirthDay");
            $scope.checkDuplicatePatient = appService.getAppDescriptor().getConfigValue("checkDuplicatePatient");
            $scope.patientAttendanceMode = appService.getAppDescriptor().getConfigValue("patientAttendanceMode");
            $scope.providerConfig = providerConfig;
            $scope.locationConfig = locationConfig;
            $scope.verificationResults;
            $scope.duplicatePatient;
            $scope.emergencyRegistration=false;
            $scope.currenLoginLocationName=$rootScope.loggedInLocation.display;

            var doctorRoomsLoginLocMapping = function (doctorRoomsMapLoginLocation, loginLocationName)
            {
                angular.forEach(doctorRoomsMapLoginLocation, function(doctorRooms) {
                 if(doctorRooms.loginLocationName === loginLocationName)
                 {
                    console.log($scope.locationConfig);
                    $scope.locationConfig.locations=doctorRooms.doctorRooms;
                    console.log($scope.locationConfig);
                 }
             });
            }


            $scope.copyNHIFDetails = function() {
                $scope.patient.birthdate = angular.copy(new Date($scope.verificationResults.DateOfBirth));
                $scope.patient.givenName = angular.copy($scope.verificationResults.FirstName);
                $scope.patient.middleName = angular.copy($scope.verificationResults.MiddleName);
                $scope.patient.familyName = angular.copy($scope.verificationResults.LastName);
                $scope.patient.gender = angular.copy(($scope.verificationResults.Gender).charAt(0));
            };

            $scope.validateNHIF = function() {
                spinner.forPromise(patientService.validateInsuranceCard($scope.patient.insuranceIdentification, Bahmni.Common.Constants.normalNHIFVisit, "").then(function(response) {
                    $scope.verificationResults = response.data;

                    ngDialog.open({
                        template: 'views/insuranceStatusModal.html',
                        scope: $scope
                    });
                    return;

                }))
            };



            var getPersonAttributeTypes = function() {
                return $rootScope.patientConfiguration.attributeTypes;
            };

            var prepopulateDefaultsInFields = function() {
                var personAttributeTypes = getPersonAttributeTypes();
                var patientInformation = appService.getAppDescriptor().getConfigValue("patientInformation");
                if (!patientInformation || !patientInformation.defaults) {
                    return;
                }
                var defaults = patientInformation.defaults;
                var defaultVariableNames = _.keys(defaults);

                var hasDefaultAnswer = function(personAttributeType) {
                    return _.includes(defaultVariableNames, personAttributeType.name);
                };

                var isConcept = function(personAttributeType) {
                    return personAttributeType.format === "org.openmrs.Concept";
                };

                var setDefaultAnswer = function(personAttributeType) {
                    $scope.patient[personAttributeType.name] = defaults[personAttributeType.name];
                };

                var setDefaultConcept = function(personAttributeType) {
                    var defaultAnswer = defaults[personAttributeType.name];
                    var isDefaultAnswer = function(answer) {
                        return answer.fullySpecifiedName === defaultAnswer;
                    };

                    _.chain(personAttributeType.answers).filter(isDefaultAnswer).each(function(answer) {
                        $scope.patient[personAttributeType.name] = {
                            conceptUuid: answer.conceptId,
                            value: answer.fullySpecifiedName
                        };
                    }).value();
                };

                _.chain(personAttributeTypes)
                    .filter(hasDefaultAnswer)
                    .each(setDefaultAnswer).filter(isConcept).each(setDefaultConcept).value();
            };

            var expandSectionsWithDefaultValue = function() {
                angular.forEach($rootScope.patientConfiguration && $rootScope.patientConfiguration.getPatientAttributesSections(), function(section) {
                    var notNullAttribute = _.find(section && section.attributes, function(attribute) {
                        return $scope.patient[attribute.name] !== undefined;
                    });
                    section.expand = section.expanded || (notNullAttribute ? true : false);
                });
            };

            var init = function() {
                $scope.patient = patient.create();
                prepopulateDefaultsInFields();
                expandSectionsWithDefaultValue();
                $scope.patientLoaded = true;
                doctorRoomsLoginLocMapping(doctorRoomsMapLoginLocation,$rootScope.loggedInLocation.display);
            };

            init();

            var prepopulateFields = function() {
                var fieldsToPopulate = appService.getAppDescriptor().getConfigValue("prepopulateFields");
                if (fieldsToPopulate) {
                    _.each(fieldsToPopulate, function(field) {
                        var addressLevel = _.find($scope.addressLevels, function(level) {
                            return level.name === field;
                        });
                        if (addressLevel) {
                            $scope.patient.address[addressLevel.addressField] = $rootScope.loggedInLocation[addressLevel.addressField];
                        }
                    });
                }
            };
            prepopulateFields();

            var addNewRelationships = function() {
                var newRelationships = _.filter($scope.patient.newlyAddedRelationships, function(relationship) {
                    return relationship.relationshipType && relationship.relationshipType.uuid;
                });
                newRelationships = _.each(newRelationships, function(relationship) {
                    delete relationship.patientIdentifier;
                    delete relationship.content;
                    delete relationship.providerName;
                });
                $scope.patient.relationships = newRelationships;
            };

            var getConfirmationViaNgDialog = function(config) {
                var ngDialogLocalScope = config.scope.$new();
                ngDialogLocalScope.yes = function() {
                    ngDialog.close();
                    config.yesCallback();
                };
                ngDialogLocalScope.no = function() {
                    ngDialog.close();
                };
                ngDialog.open({
                    template: config.template,
                    data: config.data,
                    scope: ngDialogLocalScope
                });
            };

            var copyPatientProfileDataToScope = function(response) {
                var patientProfileData = response.data;
                $scope.patient.uuid = patientProfileData.patient.uuid;
                $scope.patient.name = patientProfileData.patient.person.names[0].display;
                $scope.patient.isNew = true;
                $scope.patient.registrationDate = dateUtil.now();
                $scope.patient.newlyAddedRelationships = [{}];
                $scope.actions.followUpAction(patientProfileData);
            };

            var createPatient = function(jumpAccepted) {

                return patientService.create($scope.patient, jumpAccepted).then(function(response) {
                    copyPatientProfileDataToScope(response);
                }, function(response) {
                    if (response.status === 412) {
                        var data = _.map(response.data, function(data) {
                            return {
                                sizeOfTheJump: data.sizeOfJump,
                                identifierName: _.find($rootScope.patientConfiguration.identifierTypes, {
                                    uuid: data.identifierType
                                }).name
                            };
                        });
                        getConfirmationViaNgDialog({
                            template: 'views/customIdentifierConfirmation.html',
                            data: data,
                            scope: $scope,
                            yesCallback: function() {
                                return createPatient(true);
                            }
                        });
                    }
                    if (response.isIdentifierDuplicate) {
                        errorMessage = response.message;
                    }
                });
            }

            var createPromise = function() {
                var deferred = $q.defer();
                if ($scope.checkDuplicatePatient && !$scope.emergencyRegistration) {

                    spinner.forPromise(patientService.patientDuplicateDetection($scope.patient).then(function(response) {
                        var duplicateResponse = JSON.stringify(response.data.patients[0].status);
                        if (duplicateResponse == "false") {
                            createPatient().finally(function() {
                                return deferred.resolve({});
                            });
                        } else {
                            $scope.duplicatePatient = response.data.patients[0];
                            ngDialog.open({
                                template: 'views/duplicateStatusModal.html',
                                scope: $scope
                            });
                            return deferred.resolve({});
                        }

                    }));

                    return deferred.promise;
                } else {

                    createPatient().finally(function() {
                        return deferred.resolve({});
                    });
                    return deferred.promise;
                }
            };

            $scope.isOffline = function() {
                return offlineService.isOfflineApp();
            };




            $scope.continuePatientCreate = function() {
                var deferred = $q.defer();
                createPatient().finally(function() {
                    return deferred.resolve({});
                });
                return deferred.promise;
            };

            $scope.create = function() {
                addNewRelationships();
                var errorMessages = Bahmni.Common.Util.ValidationUtil.validate($scope.patient, $scope.patientConfiguration.attributeTypes);
                if (errorMessages.length > 0) {
                    errorMessages.forEach(function(errorMessage) {
                        messagingService.showMessage('error', errorMessage);
                    });
                    return $q.when({});
                }
                return spinner.forPromise(createPromise()).then(function(response) {
                    if (errorMessage) {
                        messagingService.showMessage("error", errorMessage);
                        errorMessage = undefined;
                    }
                });
            };
            
            $scope.afterSave = function() {
                messagingService.showMessage("info", "REGISTRATION_LABEL_SAVED");
                $state.go("patient.edit", {
                    patientUuid: $scope.patient.uuid
                });
            };

    $scope.toggleEmergencyRegistration = function () {
           $scope.emergencyRegistration=!$scope.emergencyRegistration;
           console.log($scope.emergencyRegistration);
             };
        }
    ]);