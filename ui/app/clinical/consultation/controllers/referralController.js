'use strict';

angular.module('bahmni.clinical')
    .controller('ReferralController',['$scope', '$rootScope', '$stateParams','$window','$http','contextChangeHandler', 'spinner', 'conceptSetService',
        'messagingService', 'referralConceptSet','printPrivService', 'appService','$state','locationService','providerService','$location', 'visitConfig','sessionService','configurations', 'visitService','retrospectiveEntryService',
        function ($scope, $rootScope,$stateParams,$window, $http,contextChangeHandler, spinner, conceptSetService, messagingService, referralConceptSet,
                 printPrivService, appService,$state,locationService,providerService,$location,visitConfig,sessionService,configurations, visitService,retrospectiveEntryService) {

			 var vm = this;
			 var loginLocationUuid = this;
			 var visitLocationUuid = this;
			 $scope.room = {};


        // $scope.configName = $stateParams.configName;
          $scope.consultation.extensions = $scope.consultation.extensions ? $scope.consultation.extensions : {mdrtbSpecimen: []};
            var initializeReferralScopes = function () {
               $scope.newSpecimens = $scope.consultation.newlyAddedSpecimens || [];
            };

            //use doctors
            /* var getAllProviders = function () {
             $scope.rooms=[];
                    var params = {v: "custom:(display,person,uuid)"};
                    return providerService.list(params).then(function (response) {
                        return _.uniqBy(response.data.results, function (result) {
                            $scope.rooms.push(result.person.display);
                        });
                    });
                };*/

            //use this if its doctors room
            locationService.getAllByTag('Doctors Room').then(function(data)
            					{
            					console.log("Doctors Room");
            					$scope.rooms=[];
            					data.data.results.forEach(function(result)
                                				{
                                				$scope.rooms.push(result.display);
                                				})
                                				console.log($scope.rooms);

            					//getLocationuuid(data.data.results);
            					});

			//initializeReferralScopes();
         
            $scope.isRetrospectiveMode = function () {
                return !_.isEmpty(retrospectiveEntryService.getRetrospectiveEntry());
            };
			
			
            var init = function () {

                var results = _.find(referralConceptSet.setMembers, function (member) {
                    return member.conceptClass.name === "Transfer_Referrals";
                });
               
                $scope.resultsConceptName = results && results.name.name;
                $scope.referObservation=$scope.consultation.observations;
                getAllProviders();
            };

            $scope.gotToPrint = function () {
               $state.go('patient.dashboard.show.printPriv');
            };

            $scope.SelectedRow = function() {
                  $scope.count++;
                                   };

            var postSaveReferral = function()
            {
				console.log("-sasa-"+$scope.room.selected);
				console.log("Post Save");
				console.log("Post "+$scope.patient.uuid);

				if($scope.room.selected){
				console.log(998);
				printPrivService.changeRoom($scope.room.selected,$scope.patient.uuid).then(function(data){
				//console.log(data);
				});

                                          }

				console.log($scope.consultation.observations);
				findTransferType($scope.consultation.observations[0].groupMembers);
				if($scope.TransferIn===true)
				{
					
					
					locationService.getAllByTag('Login Location').then(function(data)
					{
					console.log("login location");
					console.log(data);
					getLocationuuid(data.data.results);
					changeVisit($scope.consultation.observations[0].groupMembers);
					});
					
					
				}
			
				
				
            }
            
            var getLocationuuid = function (locations)
            { 
				locations.forEach(function(location)
				{
					if(location.display==$scope.choseenVisit)
					{
						console.log("Location Uuid");
						$scope.locationUuid=location.uuid;
					}
					
				});
				
			}
            
            
           var findTransferType = function (dataTrans)
            {
				$scope.TransferIn=false;
				dataTrans.forEach(function(data)
				{  

						
						
						if(data.valueAsString=="Transfer Within Facility")
						{

						$scope.TransferIn= true;
						
						}

					if(data.conceptNameToDisplay=="Referral Programs")
					{	
						
						$scope.choseenVisit = data.valueAsString;
						
					}
					
					
				});
				
				
				
			};
			
			var changeVisit = function(dataTrans)
			{
				
				var encounterConfig = angular.extend(new EncounterConfig(), configurations.encounterConfig());
				var visitTypes = encounterConfig.getVisitTypes();
				console.log("visit types");
				console.log(encounterConfig.getVisitTypes());
				 
			
				
			//get Uuuid of the selectedVisit	
				visitTypes.forEach(function(visitType)
				{
						
					if(visitType.name==$scope.choseenVisit)
					{	
						$scope.visitUuid = visitType.uuid;
					}
					
				});
				
				openVisit($scope.patient.uuid,$scope.visitUuid,$scope.locationUuid);
				
			}

			
	 var openVisit = function (patientUuid,visitType,location)
         {

          var params = {
                         patient: patientUuid,
                         location: location,
                         visitType: visitType
                     };



          var visitUuid = $state.$current.locals.globals.visitHistory.activeVisit.uuid;
           /*$http.post(Bahmni.Common.Constants.endVisitUrl + '?visitUuid=' + visitUuid, {
                          withCredentials: true
                      });*/

            $http.post(Bahmni.Common.Constants.visitUrl, params, {
                                     withCredentials: true
                                  });
            


        };

           // $scope.consultation.preSaveHandler.register("referralSaveHandlerKey", postSaveReferral);
             $scope.consultation.postSaveHandler.register("referralPostSaveHandlerKey", postSaveReferral);

            init();

        }
    ])
;
