'use strict';
angular.module('bahmni.cashier')
    .factory('getSaleOrdersService', ['$http', function($http) {

        var getOrders = function(search) {
            var params = {
               search: search
                            };

            return $http.get(Bahmni.Common.Constants.getSalesOrders, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

        var updateStatus = function(name,status) {
                                      var params = {
                                         drug_id: name,
                                         status: status
                                                   };

                                      return $http.get(Bahmni.Common.Constants.updateStatusad, {
                                          method: "GET",
                                          params: params,
                                          withCredentials: true
                                      });
                                  };

         var paymentConfirmed = function(orderID) {
                             var params = {
                                orderID: orderID
                                          };

                             return $http.get(Bahmni.Common.Constants.paymentConfirmed, {
                                 method: "GET",
                                 params: params,
                                 withCredentials: true
                             });
                         };

        var getOrdersLines = function(orderID){
         var params = {
              orderID: orderID
                       };

               return $http.get(Bahmni.Common.Constants.getSalesOrders_line, {
                                method: "GET",
                                params: params,
                                withCredentials: true
                            });


        };
         var getSalesOrders_line_other = function(orderID){
                         var params = {
                              orderID: orderID
                                       };

                               return $http.get(Bahmni.Common.Constants.getSalesOrders_line_other, {
                                                method: "GET",
                                                params: params,
                                                withCredentials: true
                                            });
											
											
		 };
          var cancelOrder = function(orderID){
                 var params = {
                      orderID: orderID
                               };

                       return $http.get(Bahmni.Common.Constants.cancelOrder, {
                                        method: "GET",
                                        params: params,
                                        withCredentials: true
                                    });


                };
          var cancelOrderLine = function(orderlineID){
              var params = {
                 orderlineID: orderlineID
                            };
                var datas = "<gepgPmtSpInfo><PymtTrxInf><TrxId></TrxId><SpCode></SpCode><PayRefId></PayRefId><BillId></BillId><PayCtrNum></PayCtrlNum><BillAmt></BillAmt><PaidAmt></PaidAmt><BillPayOpt></BillPayOpt><CCy></CCy><TrxDtTm></TrxDtTm><UsdPayChnl><UsdPayChnl><PyrCellNum></PyrCellNum><PyrName></PyrName><PyrEmail></PyrEmail><PspReceiptNumber></PspReceiptNumber><PspName></PspName><ctrAccNum></ctrAccNum></PymtTrxInf></gepgPmtSpInfo>";
                var url = "https://192.168.1.5/openmrs/ws/rest/v1/receiveResponse/post_payment_information";


          return $http({
              method: 'POST',
              url: 'https://192.168.1.5/openmrs/ws/rest/v1/receiveResponse/get_control_number',
              data: '<gepgBillSubResp><BillTrxInf><BillId>7885</BillId><TrxSts>GS</TrxSts><PayCntrNum>1230</PayCntrNum><TrxStsCode>7242;7627</TrxStsCode></BillTrxInf></gepgBillSubResp>',
              headers: { "Content-Type": 'application/xml' }
          });

                          };

        var createItem = function (name,category,strength,dosageForm){
         var params = {
               name: name,
               category: category,
               strength: strength,
               dosageForm: dosageForm
                        };

               return $http.get(Bahmni.Common.Constants.createItem, {
                      method: "GET",
                      params: params,
                      withCredentials: true
                            });

        };

        var SearchItem = function (name){
         var params = {
               name: name
                        };

               return $http.get(Bahmni.Common.Constants.getAddItems, {
                      method: "GET",
                      params: params,
                      withCredentials: true
                            });

        };

         var getPaidOrders = function (search){
                 var params = {
                       search: search
                                };

                       return $http.get(Bahmni.Common.Constants.getPaidorders, {
                              method: "GET",
                              params: params,
                              withCredentials: true
                                    });

                };

        var getCancelledorders = function (search){
                var params = {
                   search: search
                      };

                     return $http.get(Bahmni.Common.Constants.getCancelledorders, {
                             method: "GET",
                             params: params,
                              withCredentials: true
                               });

                                                 };

            var getConcept = function(conceptName) {
                   return $http.get(Bahmni.Common.Constants.conceptSearchByFullNameUrl +
                       "&name=" + conceptName +
                       "&v=full", {cache: true});
                                              };




        return {
            getOrders: getOrders,
            updateStatus: updateStatus,
            getOrdersLines: getOrdersLines,
            cancelOrder: cancelOrder,
            paymentConfirmed: paymentConfirmed,
            cancelOrderLine: cancelOrderLine,
            getPaidOrders: getPaidOrders,
            getCancelledorders: getCancelledorders,
            SearchItem: SearchItem,
            getSalesOrders_line_other: getSalesOrders_line_other,
            getConcept: getConcept
        };
    }]);