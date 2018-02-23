"use strict";

homeCtrl.$inject = ['$state', '$scope', 'gameService'];

function homeCtrl($state, $scope, GameService) {

    $scope.gameData = {};
    $scope.gameData.fieldSize = "3";
    $scope.gameData.playerSide = "x";

    $scope.startGame = function(){
        let fieldSize = $scope.gameData.fieldSize;
        let playerSide = $scope.gameData.playerSide;

        GameService.startGame(fieldSize, playerSide);
        $state.go('game');
    };

    console.log('homeCtrl');
}

export default homeCtrl;