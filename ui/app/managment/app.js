'use strict';
angular
    .module('managment', ['ui.router', 'bahmni.managment', 'bahmni.common.domain', 'bahmni.common.patient', 'authentication', 'bahmni.common.config', 'bahmni.common.appFramework',
        'httpErrorInterceptor', 'bahmni.common.routeErrorHandler', 'bahmni.common.uiHelper', 'bahmni.common.patientSearch', 'bahmni.common.util', 'bahmni.common.conceptSet',
        'RecursionHelper', 'infinite-scroll', 'bahmni.common.displaycontrol.patientprofile', 'bahmni.common.obs', 'bahmni.common.displaycontrol.orders', 'bahmni.common.i18n',
        'bahmni.common.displaycontrol.observation', 'bahmni.common.orders', 'pascalprecht.translate', 'ngCookies', 'bahmni.common.offline', 'bahmni.common.uicontrols'])
    .config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$bahmniTranslateProvider', '$compileProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider, $bahmniTranslateProvider, $compileProvider) {
            $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = true;
            $urlRouterProvider.otherwise('/viewItem');
            var homeBacklink = {label: "Home", url: "../home/", accessKey: "h", icon: "fa-home"};
            var searchBacklink = {label: "Search", state: "search", accessKey: "p", icon: "fa-users"};

        // @if DEBUG='production'
            $compileProvider.debugInfoEnabled(false);
        // @endif

        // @if DEBUG='development'
            $compileProvider.debugInfoEnabled(true);
        // @endif

            $stateProvider
            .state('newItem', {
                url: '/newItem',
                data: {
                    extensionPointId: 'org.bahmni.managment.dashboard',
                    backLinks: [homeBacklink]
                },
                views: {
                    'content': {
                        templateUrl: 'views/newItem.html',
                        controller: 'NewItemController'
                    }
                },
                resolve: { initialization: 'initialization' }
            }).state('addPrice', {
                   url: '/addPrice',
                data: {
                    extensionPointId: 'org.bahmni.managment.addPrice',
                    backLinks: [homeBacklink]
                },
                views: {
                    'content': {
                        templateUrl: 'views/addPrice.html',
                        controller: 'AddPriceController'
                    }
                },
                resolve: { initialization: 'initialization' },
                params: {conceptUuid: 'conceptUuid', conceptName: 'conceptName'}
            }).state('viewItem', {
                   url: '/viewItem',
                data: {
                    extensionPointId: 'org.bahmni.managment.viewItem',
                    backLinks: [homeBacklink]
                },
                views: {
                    'content': {
                        templateUrl: 'views/viewItem.html',
                        controller: 'ViewItemController'
                    }
                },
                resolve: { initialization: 'initialization' },
                reload: true,
                params: { conceptName: 'defaultValue'}
            }).state('editItem', {
                   url: '/editItem',
                data: {
                    extensionPointId: 'org.bahmni.managment.editItem',
                    backLinks: [homeBacklink]
                },
                views: {
                    'content': {
                        templateUrl: 'views/editItem.html',
                        controller: 'EditItemController'
                    }
                },
                resolve: { initialization: 'initialization' },
                params: {concept: 'concept'}
            })
            $bahmniTranslateProvider.init({app: 'managment', shouldMerge: true});
        }]

).run(['backlinkService', function (backlinkService) {
    backlinkService.addUrl({label: "Patient Search", url: "../home/"});
}]);

