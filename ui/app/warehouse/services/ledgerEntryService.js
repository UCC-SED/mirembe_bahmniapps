'use strict';
angular.module('bahmni.warehouse')
    .factory('ledgerEntryService', ['$http', function($http) {

        var getLedger = function(name, batchNo, invNo) {
            var params = {
               item_name: name,
               BatchNo: batchNo,
               InvoiceNo: invNo
                            };

            return $http.get(Bahmni.Common.Constants.selectLedger_entry, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };



      var createLedgerEntry = function(item_id, LedgerEntryType, quantity, BatchNo, InvoiceNo, ExpiryDate, receiveDate,
                    price_list_id,amount,math) {
            var params = {
                item_id: item_id,
                LedgerEntryType: LedgerEntryType,
                quantity: quantity,
                BatchNo: BatchNo,
                InvoiceNo: InvoiceNo,
                ExpiryDate: ExpiryDate,
                receiveDate: receiveDate,
                price_list_id: price_list_id,
                amount: amount,
                math: math

            };
            return $http.get(Bahmni.Common.Constants.insertLedger_entry, {
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