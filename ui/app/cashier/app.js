'use strict';
angular
    .module('cashier', ['ui.router', 'bahmni.cashier', 'bahmni.common.domain', 'bahmni.common.patient', 'authentication', 'bahmni.common.config', 'bahmni.common.appFramework',
        'httpErrorInterceptor', 'bahmni.common.routeErrorHandler', 'bahmni.common.uiHelper', 'bahmni.common.patientSearch', 'bahmni.common.util', 'bahmni.common.conceptSet',
        'RecursionHelper', 'infinite-scroll', 'bahmni.common.displaycontrol.patientprofile', 'bahmni.common.obs', 'bahmni.common.displaycontrol.orders', 'bahmni.common.i18n',
        'bahmni.common.displaycontrol.observation', 'bahmni.common.orders', 'pascalprecht.translate', 'ngCookies', 'bahmni.common.offline', 'bahmni.common.uicontrols'])
    .config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$bahmniTranslateProvider', '$compileProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider, $bahmniTranslateProvider, $compileProvider) {
            $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = true;
            $urlRouterProvider.otherwise('/index');
            var homeBacklink = {label: "Home", url: "../home/", accessKey: "h", icon: "fa-home"};
            var searchBacklink = {label: "Search", state: "search", accessKey: "p", icon: "fa-users"};

        // @if DEBUG='production'
            $compileProvider.debugInfoEnabled(false);
        // @endif

        // @if DEBUG='development'
            $compileProvider.debugInfoEnabled(true);
        // @endif

            $stateProvider
            .state('index', {
                url: '/index',
                data: {
                    extensionPointId: 'org.bahmni.home.dashboard',
                    backLinks: [homeBacklink]
                },
                views: {
                    'content': {
                         templateUrl: 'views/new_orders.html',
                         controller: 'ordersController'
                    }
                },
                resolve: { initialization: 'initialization' }
            })
            .state('paid_orders', {
                            url: '/paid_orders',
                            data: {
                                extensionPointId: 'org.bahmni.home.dashboard',
                                backLinks: [homeBacklink]
                            },
                            views: {
                                'content': {
                                     templateUrl: 'views/paid_orders.html',
                                     controller: 'paid_ordersController'
                                }
                            },
                            resolve: { initialization: 'initialization' }
                        })
                            .state('cancelled', {
                            url: '/cancelled',
                            data: {
                                extensionPointId: 'org.bahmni.home.dashboard',
                                backLinks: [homeBacklink]
                            },
                            views: {
                                'content': {
                                     templateUrl: 'views/cancel_orders.html',
                                     controller: 'cancel_ordersController'
                                }
                            },
                            resolve: { initialization: 'initialization' }
                        })
            $bahmniTranslateProvider.init({app: 'warehouse', shouldMerge: true});
        }]

).run(['backlinkService', function (backlinkService) {
    backlinkService.addUrl({label: "Patient Search", url: "../home/"});
}]);

