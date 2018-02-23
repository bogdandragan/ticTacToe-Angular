"use strict";

module.exports = function(app){
    app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {
                url: '/',
                template: require('./views/home.html'),
                controller: 'homeCtrl',
                data: {title: 'Home', description: 'Home page description'}
            })
            .state('game', {
                url: '/game',
                template: require('./views/game.html'),
                controller: 'gameCtrl',
                data: {title: 'Game', description: 'Game page description'}
            })
            .state('404', {
                url: '/404',
                template: require('./views/404.html'),
                data: {title: 'Error 404', description: 'Error 404 page description'}
            })
            .state('error', {
                url: '/error',
                template: require('./views/error.html'),
                data: {title: 'Error', description: 'Error page description'}
            })
    }).run(function ($rootScope, $state) {
        $rootScope.$state = $state;

        $rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error) {
            console.log(error);
            if (error.redirect404) {
                $state.go(error.redirect404);
            } else {
                $state.go('error');
            }
        })
    })

}
