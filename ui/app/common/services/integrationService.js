'use strict';
angular.module('bahmni.common.services')
    .factory('integrationService', ['$http', function ($http) {
        var v = 'custom:(uuid,strength,name,dosageForm,concept:(uuid,name,names:(name)))';

        var submitLabOrder = function (providerUuid, conceptUuid, patientUuid, locationUuid) {
            var url = Bahmni.Common.Constants.submitLabOrder;
            return $http.get(url, {
                params: {
                    conceptUuid: conceptUuid,
                    providerUuid: providerUuid,
                    patientUuid: patientUuid,
                    locationUuid: locationUuid
                }
            });
        };

        var getBillType = function (patientUuid, conceptName) {
                    var params = {
                        patientUuid: patientUuid,
                        concept: conceptName
                    };
                    return $http.get(Bahmni.Common.Constants.observationsUrl, {params: params});
                };

         var StockReduction = function (drugsTOreduct,payment_type) {
                            var params = {
                                orders: drugsTOreduct,
                                payment_type: payment_type
                            };
                            return $http.get(Bahmni.Common.Constants.StockReductionUrl, {params: params});
                        };

        var submitDrugOrder = function (providerUuid, drugOrder, patientUuid, locationUuid) {
            return $http({
                method: 'POST',
                url: Bahmni.Common.Constants.submitDrugOrder,
                data: {
                    "providerUuid": providerUuid,
                    "drugOrder": drugOrder,
                    "patientUuid": patientUuid,
                    "locationUuid": locationUuid
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

      var passBillDrugOrder = function (providerUuid, drug_orders, patientUuid, locationUuid,payment_type){
                  var params = {
                        provider: providerUuid,
                        drug_orders: drug_orders,
                        patient_uuid: patientUuid,
                        locationUuid: locationUuid,
                        payment_type: payment_type
                                 };

                        return $http.get(Bahmni.Common.Constants.drugBillingUrl, {
                               method: "GET",
                               params: params,
                               withCredentials: true
                                     });

                 };

          var passBillOrder = function (providerUuid, orders, patientUuid, locationUuid,payment_type){
                       var params = {
                             provider: providerUuid,
                             orders: orders,
                             patient_uuid: patientUuid,
                             locationUuid: locationUuid,
                             payment_type: payment_type
                                      };

                             return $http.get(Bahmni.Common.Constants.lab_rad_billOrdersUrl, {
                                    method: "GET",
                                    params: params,
                                    withCredentials: true
                                          });

                      };

        var submitDisposition = function (providerUuid, patientUuid, dispositionNotes) {
            return $http({
                method: 'POST',
                url: Bahmni.Common.Constants.submitDisposition,
                data: {
                    "providerUuid": providerUuid,
                    "patientUuid": patientUuid,
                    "dispositionNotes": dispositionNotes
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

        var submitDrug = function (providerUuid, conceptUuid) {
            var url = Bahmni.Common.Constants.submitLabOrder;
            return $http.get(url, {
                params: {
                    conceptUuid: conceptUuid,
                    providerUuid: providerUuid
                }
            });
        };

         var getGothomisUserID = function (username) {
         var url = Bahmni.Common.Constants.gothomisUserId;
                    var params = {
                        username: username
                    };

                    return $http.get(url, {
                        params: params,
                        withCredentials: true
                    });
                };

        return {
            submitLabOrder: submitLabOrder,
            submitDrug: submitDrug,
            submitDrugOrder: submitDrugOrder,
            submitDisposition: submitDisposition,
            passBillDrugOrder:passBillDrugOrder,
            StockReduction :StockReduction,
            passBillOrder:passBillOrder,
            getBillType: getBillType,
            getGothomisUserID :getGothomisUserID
        };
    }]);
