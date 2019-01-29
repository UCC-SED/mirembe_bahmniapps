'use strict';
angular.module('bahmni.socialWorker')
    .factory('ledgerEntryService', ['$http', function($http) {

        var getLedger = function(name, batchNo, invNo) {
            var params = {
               item_name: name,
               BatchNo: batchNo,
               InvoiceNo: invNo
                            };

            return $http.get("https://192.168.33.10/openmrs/ws/rest/v1/ledger_entry/selectLedger_entry", {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };



      var createLedgerEntry = function(item_id, LedgerEntryType, quantity, BatchNo, InvoiceNo, ExpiryDate, receiveDate,
                    price_list_id,amount) {
            var params = {
                item_id: item_id,
                LedgerEntryType: LedgerEntryType,
                quantity: quantity,
                BatchNo: BatchNo,
                InvoiceNo: InvoiceNo,
                ExpiryDate: ExpiryDate,
                receiveDate: receiveDate,
                price_list_id: price_list_id,
                amount: amount

            };
            return $http.get("https://192.168.33.10/openmrs/ws/rest/v1/ledger_entry/insertLedger_entry", {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };



        return {
            getLedger: getLedger,
            createLedgerEntry: createLedgerEntry
        };
    }]);