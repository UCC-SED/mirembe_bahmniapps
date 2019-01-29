'use strict';
angular.module('bahmni.socialWorker')
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

         var getConcept = function(conceptName) {
                            return $http.get(Bahmni.Common.Constants.conceptSearchByFullNameUrl +
                                "&name=" + conceptName +
                                "&v=full", {cache: true});
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

               return $http.get(Bahmni.Common.Constants.cancelOrderLine, {
                               method: "GET",
                               params: params,
                               withCredentials: true
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
                 var getDiscountOrders = function (search){
                                 var params = {
                                       search: search
                                                };

                                       return $http.get(Bahmni.Common.Constants.getDiscountOrders, {
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

        var discount = function (dicountAmount,paid,exemptionUuid,saleOrderId){
         var params = {
               dicountAmount: dicountAmount,
               paid: paid,
               saleOrderId: saleOrderId,
               exemptionUuid: exemptionUuid
                        };

             return $http.get(Bahmni.Common.Constants.saveDiscount, {
                 method: "GET",
                 params: params,
                 withCredentials: true
                          });


        }


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
            discount: discount,
            getSalesOrders_line_other: getSalesOrders_line_other,
            getDiscountOrders: getDiscountOrders,
            getConcept: getConcept
        };
    }]);