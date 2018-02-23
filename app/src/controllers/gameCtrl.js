"use strict";

gameCtrl.$inject = ['$state', '$scope', 'gameService'];

function gameCtrl($state, $scope, GameService) {

    GameService.initGameData();

    $scope.gameData = GameService.gameObj;

    $scope.cellClick = function(cell){
        GameService.nextStep(cell, $scope.gameData);
    }

    $scope.resetGameClick = function(){
        GameService.resetGame();
    }

    $scope.newGameClick = function(){
        GameService.newGame();
    }
};

export default gameCtrl;