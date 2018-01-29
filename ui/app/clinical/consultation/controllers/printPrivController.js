'use strict';

angular.module('bahmni.clinical')
    .controller('printPrivController', ['$scope', '$rootScope', '$q', 'labOrderResultService', 'treatmentService', 'dispositionService', 'printPrivService', 'retrospectiveEntryService', 'spinner', '$state',
        function ($scope, $rootScope, $q, labOrderResultService, treatmentService, dispositionService, printPrivService, retrospectiveEntryService, spinner, $state, ) {
            var consultation = $scope.consultation;
            console.log($scope.consultation);
            var allDispositions = [];
            $scope.female = null;
            $scope.male = null;
            $scope.tb_other = null;
            $scope.tb_lung = null;
            $scope.HIVstatus = null;

            if ($scope.patient.gender == 'F')
                $scope.female = "✔";
            else
                $scope.male = "✔";

            var params = {
                patientUuid: $scope.patient.uuid
            }
            labOrderResultService.getAllForPatient(params).then(function (response) {
                console.log("lab cehck");
                console.log(response.tabular.tabularResult);
                var labresults = response.tabular.tabularResult.values;
                var Laborders = response.tabular.tabularResult.orders;
                Laborders.forEach(function (order) {
                    if (order.testName == "CD4 COUNT") {
                        labresults.forEach(function (labresult) {
                            if (labresult.testOrderIndex == order.index) {
                                $scope.cd4 = labresult.result;
                                $scope.cd4Date = labresult.accessionDateTime;
                                console.log(labresult.result);
                            }
                        });

                    }

                    if (order.testName == "Smear") {
                        labresults.forEach(function (labresult) {
                            if (labresult.testOrderIndex == order.index) {
                                $scope.Smear = labresult.result;
                                $scope.SmearDate = labresult.accessionDateTime;
                                console.log(labresult.result);
                            }
                        });

                    }

                    if (order.testName == "Smear Test (Slit Skin)") {
                        labresults.forEach(function (labresult) {
                            if (labresult.testOrderIndex == order.index) {
                                $scope.slitskin = labresult.result;
                                $scope.slitskinDate = labresult.accessionDateTime;
                                console.log(labresult.result);
                            }
                        });

                    }

                });

            });

            treatmentService.getAllDrugOrdersFor($scope.patient.uuid, "All TB Drugs").then(function (response) {
                console.log(response);
                if (response.length > 0) {

                    var tbDrugs = "";
                    var smallDate = 1;
                    var BigDate = 1;
                    var currentDate = new Date();
                    response.forEach(function (resp) {
                        var stopDate = new Date(resp.effectiveStopDate);
                        if (currentDate.getTime() <= stopDate.getTime()) {

                            tbDrugs = tbDrugs + resp.concept.name + ",";
                            if (smallDate < resp.effectiveStartDate)
                                smallDate = resp.effectiveStartDate;

                            if (BigDate < resp.effectiveStopDate)
                                BigDate = resp.effectiveStopDate;
                        }

                    });
                    $scope.dotStart = smallDate;
                    $scope.dotEnd = BigDate;

                }


            });

            treatmentService.getAllDrugOrdersFor($scope.patient.uuid, "All HIV Drugs").then(function (response) {
                console.log("hiv drug");
                console.log(response);
                var hivDrugs = "";
                var smallDate = 1;
                var BigDate = 1;
                var currentDate = new Date();
                if (response.length > 0) {
                    response.forEach(function (resp) {
                        var stopDate = new Date(resp.effectiveStopDate);
                        if (currentDate.getTime() <= stopDate.getTime()) {

                            hivDrugs = hivDrugs + resp.concept.name + ",";
                            if (smallDate < resp.effectiveStartDate)
                                smallDate = resp.effectiveStartDate;

                            if (BigDate < resp.effectiveStopDate)
                                BigDate = resp.effectiveStopDate;
                        }


                    });

                }
                $scope.hivDrugs = hivDrugs;
                $scope.smallDate = smallDate;
                $scope.BigDate = BigDate;


            });

            printPrivService.getTransferData($scope.patient.uuid, "Facility Transfers").then(function (data) {
                $scope.transferData = data;
                if (data.data.length > 0) {
                    retriveTransferData($scope.transferData.data[0].groupMembers);
                }
            });

            printPrivService.getTB($scope.patient.uuid).then(function (data) {
                $scope.tbData = data;

                if (data.data.results.length > 0) {

                    $scope.tbData.data.results.forEach(function (result) {
                        if (result.display == "NATIONAL TB AND LEPROSY PROGRAM") {
                            tbStartdate(result.dateEnrolled);
                            getTbData(result.attributes);
                        }
                        if (result.display == "HIV Care and Treatment") {
                            getHIVData(result.attributes);
                        }
                    });
                }
            });

            printPrivService.getTransferData($scope.patient.uuid, "TB - DOT - startDate").then(function (data) {
                $scope.dotStart = data;

                if ($scope.dotStart.data.length > 0) {
                    var oldestData = $scope.dotStart.data.length - 1;

                    $scope.dotStart = $scope.dotStart.data[oldestData].value;

                }
            });

            printPrivService.getTransferData($scope.patient.uuid, "TB - DOT - EndDate").then(function (data) {
                $scope.dotEnd = data;

                if ($scope.dotEnd.data.length > 0) {

                    $scope.dotEnd = $scope.dotEnd.data[0].value;

                }
            });

            var getTBmedsNames = function (data) {
                var names = null;
                data.forEach(function (obj) {
                    if (obj.concept.shortName) {
                        names = names + "," + obj.concept.shortName;
                    } else {
                        names = names + "," + obj.concept.name;
                    }


                });


                while (names.charAt(0) == ',') {
                    names = names.substr(1);
                }
                $scope.medName = names;
            }

            function getTbData(objz) {
                objz.forEach(function (obj) {
                    console.log(obj.attributeType.display);
                    if (obj.attributeType.display == "Classification by site") {


                        if (obj.value.display == "TB - Pulmonary") {

                            $scope.tb_lung = "✔";
                        }
                        if (obj.value.display == "TB - Extra-pulmonary") {
                            $scope.tb_other = "✔";

                        }
                    }

                    if (obj.attributeType.display == "HIV Status") {


                        if (obj.value.display == "TB - HIV Status - Positive") {

                            $scope.HIVstatus = "✔";
                        }

                    }

                });
            };

            function tbStartdate(data) {
                $scope.startDate = data;

            };

            function getHIVData(HIVdata) {
                HIVdata.forEach(function (data) {
                    if (data.attributeType.display == "ID_Number") {
                        $scope.HIVnO = data.value;
                    }
                    if (data.attributeType.display == "Date Enrolled In Care") {
                        $scope.HIVdATE = data.value;
                    }


                });
            };

            function retriveTransferData(newObs) {

                newObs.forEach(function (obs) {
                    if (obs.conceptNameToDisplay == "Name of Facility To be Transfer") {

                        $scope.hospital_name = obs.valueAsString;


                    }
                    if (obs.conceptNameToDisplay == "Clinical Notes") {
                        $scope.clinical_notes = obs.valueAsString;

                    }
                    if (obs.conceptNameToDisplay == "Facility District") {
                        $scope.FacilityToBeDistrict = obs.valueAsString;

                    }

                    if (obs.conceptNameToDisplay == "Remarks/Reasons") {
                        $scope.remarks = obs.valueAsString;
                    }

                    if (obs.conceptNameToDisplay == "Makazi ya Sasa") {
                        var currentLoc = obs.groupMembers;

                        currentLoc.forEach(function (curr) {
                            if (curr.conceptNameToDisplay == "Makaz") {
                                $scope.MakazSasa = curr.valueAsString;
                            }

                            if (curr.conceptNameToDisplay == "Namba ya Wilaya") {
                                $scope.nambaWilayaSasa = curr.valueAsString;
                            }

                        });

                    }
                    //new location
                    if (obs.conceptNameToDisplay == "Makazi Mapya") {
                        var currentLoc = obs.groupMembers;

                        currentLoc.forEach(function (curr) {
                            if (curr.conceptNameToDisplay == "Makaz") {
                                $scope.Makazmapya = curr.valueAsString;
                            }

                            if (curr.conceptNameToDisplay == "Namba ya Wilaya") {
                                $scope.nambaWilayamapya = curr.valueAsString;
                            }

                        });

                    }


                });
            };

            /*var diagnosis=$scope.consultation.pastDiagnoses;
            diagnosis.forEach(function(dg)
            {
            	if(dg.codedAnswer.name=="Tuberculosis, pulmonary, NOS")
            	{
            		$scope.tb_lung="✔";
            	}

            });*/

            var getClinicalNotes = function () {

            };



            $scope.gotTotransfer = function () {
                $state.go('patient.dashboard.show.referral', {}, {
                    reload: true
                });
            };


        }
    ]);
