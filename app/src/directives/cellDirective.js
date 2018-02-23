cellDirective.$inject = ['$window','$timeout'];

function cellDirective($window, $timeout){
    return {
        link: function(scope, element, attrs){
            let fieldSize = scope.$parent.$parent.gameData.fieldSize;
            let fontSize = 3+'em';

            var window = angular.element($window);

            window.bind('resize', function () {
                scope.$apply();
            });

            scope.$watch(function() {
                return scope.cell.isMarked;
            }, function(newval, oldval){
                if(fieldSize > 3){
                    fontSize = 2+'em';
                }
                if(fieldSize > 5){
                    fontSize = 1.5+'em';
                }
                element.find('span').css({
                    fontSize: fontSize
                });
            });

            scope.$watch(function() {
                return element[0].clientWidth;
            }, function(newval, oldval){
               element.css({
                   height: 100/fieldSize + '%',
                   width: 100/fieldSize + '%'
               });
            });
        }
    }
}

export default cellDirective;


/*(function () {
    'use strict';

    angular
        .module('bonds')
        .directive('bndCustomerInfo', defineBndCustomerInfo);

    function defineBndCustomerInfo() {

        return {
            restrict: "AE",
            templateUrl: 'components/orders/shared/customer-info/customer-info.html',
            scope:    {
                order: '=bndOrder'
            },
            link: function(scope, element, attrs, ngModelCtrl) {
            }
        };
    }

})();*/