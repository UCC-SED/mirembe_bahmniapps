'use strict';

angular.module('bahmni.socialWorker')
.factory('initialization', ['$rootScope', '$q', 'appService', 'spinner', 'configurations', 'orderTypeService', 'locationService','mergeService', 'offlineService',
    function ($rootScope, $q, appService, spinner, configurations, orderTypeService, locationService, mergeService, offlineService) {


        var initApp = function () {
            return appService.initApp('socialWorker', {'app': true, 'extension': true });
        };



        return spinner.forPromise(initApp());
    }
]);
