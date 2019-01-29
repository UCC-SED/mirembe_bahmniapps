'use strict';

angular.module('bahmni.cashier')
.factory('initialization', ['$rootScope', '$q', 'appService', 'spinner', 'configurations', 'orderTypeService', 'locationService','mergeService', 'offlineService',
    function ($rootScope, $q, appService, spinner, configurations, orderTypeService, locationService, mergeService, offlineService) {


        var initApp = function () {
            return appService.initApp('cashier', {'app': true, 'extension': true });
        };



        return spinner.forPromise(initApp());
    }
]);
