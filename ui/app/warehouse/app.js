'use strict';
angular
    .module('warehouse', ['ui.router', 'bahmni.warehouse', 'bahmni.common.domain', 'bahmni.common.patient', 'authentication', 'bahmni.common.config', 'bahmni.common.appFramework',
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
                        templateUrl: 'views/home.html',
                        controller: 'indexController'
                    }
                },
                resolve: { initialization: 'initialization' }
            })
             .state('price_list', {
                            url: '/price_list',
                            data: {
                                extensionPointId: 'org.bahmni.home.dashboard',
                                backLinks: [homeBacklink]
                            },
                            views: {
                                'content': {
                                    templateUrl: 'views/price_list.html',
                                    controller: 'price_listController'
                                }
                            },
                            resolve: { initialization: 'initialization' }
                        })
              .state('out_of_stock', {
                                        url: '/out_of_stock',
                                         data: {
                                                extensionPointId: 'org.bahmni.home.dashboard',
                                                 backLinks: [homeBacklink]
                                                 },
                                             views: {
                                            'content': {
                                            templateUrl: 'views/out_of_stock.html',
                                            controller: 'out_of_stockController'
                                       }
                                   },
                      resolve: { initialization: 'initialization' }
                      })
          .state('ledger_entry', {
                                     url: '/ledger_entry',
                                     data: {
                                         extensionPointId: 'org.bahmni.home.dashboard',
                                         backLinks: [homeBacklink]
                                     },
                                     views: {
                                         'content': {
                                             templateUrl: 'views/ledger_entry.html',
                                             controller: 'ledgerEntryController'
                                         }
                                     },
                                     resolve: { initialization: 'initialization' }
                                 })
               .state('products', {
                            url: '/products',
                            data: {
                             extensionPointId: 'org.bahmni.home.dashboard',
                             backLinks: [homeBacklink]
                                   },
                              views: {
                                     'content': {
                                               templateUrl: 'views/products.html',
                                               controller: 'productsController'
                                                   }
                                                   },
                              resolve: { initialization: 'initialization' }
                                               })
                 .state('activateProducts', {
                      url: '/activateProducts',
                      data: {
                       extensionPointId: 'org.bahmni.home.dashboard',
                       backLinks: [homeBacklink]
                              },
                         views: {
                               'content': {
                                  templateUrl: 'views/activateProducts.html',
                                   controller: 'activeproductsController'
                                            }
                                            },
                    resolve: { initialization: 'initialization' }
                                     })
                   .state('products_mvt', {
                          url: '/products_mvt',
                           data: {
                                   extensionPointId: 'org.bahmni.home.dashboard',
                                   backLinks: [homeBacklink]
                                  },
                                  views: {
                                          'content': {
                                         templateUrl: 'views/productsMovement.html',
                                         controller: 'productsMovementController'
                                                       }
                                          },
                               resolve: { initialization: 'initialization' }
                             })                                  
                   .state('products_location', {
                          url: '/products_location',
                           data: {
							   
                                   extensionPointId: 'org.bahmni.home.dashboard',
                                   backLinks: [homeBacklink]
                                  },
                                  views: {
                                          'content': {
                                         templateUrl: 'views/products_location.html',
                                         controller: 'product_Lct_Controller'
                                                       }
                                          },
                               resolve: { initialization: 'initialization' }
                             })
                  .state('price', {
                       url: '/price',
                       data: {
                       extensionPointId: 'org.bahmni.home.dashboard',
                       backLinks: [homeBacklink]
                        },
                         views: {
                         'content': {
                           templateUrl: 'views/price.html',
                           controller: 'priceController'
                                      }
                                 },
                       resolve: { initialization: 'initialization' }
                                                      })
                  .state('physical_invent', {
                                         url: '/physical_invent',
                                         data: {
                                         extensionPointId: 'org.bahmni.home.dashboard',
                                         backLinks: [homeBacklink]
                                          },
                                           views: {
                                           'content': {
                                             templateUrl: 'views/physical_invent.html',
                                             controller: 'physical_inventController'
                                                        }
                                                   },
                                         resolve: { initialization: 'initialization' }
                                                                        })
            $bahmniTranslateProvider.init({app: 'warehouse', shouldMerge: true});
        }]

).run(['backlinkService', function (backlinkService) {
    backlinkService.addUrl({label: "Patient Search", url: "../home/"});
}]);

