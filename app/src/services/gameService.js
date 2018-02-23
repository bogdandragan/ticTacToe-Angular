GameService.$inject = ['localStorageService', 'Game', 'Cell', '$state', '$timeout'];

function GameService(localStorageService, Game, Cell, $state, $timeout){

    let gameObj = {};

    let startGame = function(fieldSize, playerSide){
        console.log("startGame");
        localStorageService.remove('gameData');

        let fieldState = [];

        let id = 0;
        for(let i = 0; i < fieldSize; i++){
            let row = [];
            for(let y = 0; y < fieldSize; y++){
                let cell = Cell.build({figure:"", id: id++, isMarked:false, isHighlighted:false});
                row.push(cell);
            }
            fieldState.push(row);
        }

        let gameData = Game.build({fieldSize:fieldSize,
            isBusy:false,
            playerSide:playerSide,
            isGameEnd:false,
            winner:"",
            fieldState: fieldState});

        console.log('game data', gameData);

        localStorageService.set('gameData', gameData);
        

    }


    let resetGame = function(){
        startGame(gameObj.fieldSize, gameObj.playerSide);
        initGameData();
    }


    let newGame = function(){
        localStorageService.remove('gameData');
        $state.go('home');
    }

    
    let initGameData = function () {
        let data = localStorageService.get('gameData');
        angular.copy(Game.build({fieldSize:data.fieldSize,
            isBusy:data.isBusy,
            playerSide:data.playerSide,
            isGameEnd:data.isGameEnd,
            winner: data.winner,
            fieldState: data.fieldState}), gameObj);
    }


    let saveGameState = function(){
        localStorageService.set('gameData', gameObj);
    }


    let nextStep = function(cell){
        console.log(gameObj);
        if(gameObj.isBusy || gameObj.isGameEnd){
            return false;
        }
        if(!cell.isMarked){
            markCell(cell, true);

            if(!gameObj.isBusy || !gameObj.isGameEnd){
                computerStep();
            }
        }
    }


    let computerStep = function(){
        var cellNum = Math.floor(Math.random() * Math.pow(gameObj.fieldSize, 2));
        //console.log(cellNum)
        for(let i = 0; i<gameObj.fieldSize; i++){
            let foundCell = gameObj.fieldState[i].find(cell => cell.id == cellNum);

            if(typeof foundCell !== 'undefined'){
                foundCell.isMarked ? computerStep() : markCell(foundCell, false);
            }
        }
    }

    let markCell = function(cell, isPlayer){
        if(!cell.isMarked){
            if(isPlayer){
                cell.figure = gameObj.playerSide;
                gameObj.isBusy = true;

            }else{
                gameObj.playerSide == "x" ? cell.figure = "o" : cell.figure = "x";
                gameObj.isBusy = false;
            }
            cell.isMarked = true;
            checkWinner(cell);
            saveGameState();
        }
    }


    let checkWinner = function(cell) {

        let xIndex = 0;
        let yIndex = 0;

        //get cell index by ID
        for (let i = 0; i < gameObj.fieldSize; i++) {
            for (let y = 0; y < gameObj.fieldState.length; y++) {
                if (gameObj.fieldState[i][y].id == cell.id) {
                    xIndex = i;
                    yIndex = y;
                    break;
                }

            }
        }

        // check row
        for (let i = 0; i < gameObj.fieldSize; i++) {
            if (gameObj.fieldState[xIndex][i].figure != cell.figure) {
                break;
            }

            if (i == gameObj.fieldSize - 1) {
                //highlight row
                for(let i = 0; i<gameObj.fieldSize; i++){
                    gameObj.fieldState[xIndex][i].isHighlighted = true;
                }
                console.log('win ', cell.figure);
                gameObj.isGameEnd = true;
                gameObj.winner = cell.figure;
                return;
            }
        }

        // check column
        for (let i = 0; i < gameObj.fieldSize; i++) {
            if (gameObj.fieldState[i][yIndex].figure != cell.figure) {
                break;
            }

            if (i == gameObj.fieldSize - 1) {
                //highlight column
                for(let i = 0; i<gameObj.fieldSize; i++){
                    gameObj.fieldState[i][yIndex].isHighlighted = true;
                }
                console.log('win ', cell.figure);

                gameObj.isGameEnd = true;
                gameObj.winner = cell.figure;
                return;
            }
        }

        //left to right diagonal
        if (xIndex == yIndex) {
            for (let i = 0; i < gameObj.fieldSize; i++) {
                if (gameObj.fieldState[i][i].figure != cell.figure)
                    break;
                if (i == gameObj.fieldSize - 1) {
                    //highlight diagonal
                    for(let i = 0; i<gameObj.fieldSize; i++){
                        gameObj.fieldState[i][i].isHighlighted = true;
                    }
                    console.log('win ', cell.figure);
                    gameObj.isGameEnd = true;
                    gameObj.winner = cell.figure;
                    return;
                }
            }
        }

        //right to left diagonal
        if ((xIndex + yIndex) == gameObj.fieldSize - 1) {
            for (let i = 0; i < gameObj.fieldSize; i++) {
                if (gameObj.fieldState[i][(gameObj.fieldSize - 1) - i].figure != cell.figure)
                    break;
                if (i == gameObj.fieldSize - 1) {

                    //highlight diagonal
                    for(let i = 0; i<gameObj.fieldSize; i++){
                        gameObj.fieldState[i][(gameObj.fieldSize - 1) - i].isHighlighted = true;
                    }
                    console.log('win ', cell.figure);
                    gameObj.isGameEnd = true;
                    gameObj.winner = cell.figure;
                    return;
                }
            }
        }

        //check draw
        let isDraw = true;
        for (let i = 0; i < gameObj.fieldSize; i++) {
            for (let y = 0; y < gameObj.fieldSize; y++) {
                if (!gameObj.fieldState[i][y].isMarked) {
                    isDraw = false;
                }
            }
        }
        if (isDraw) {
            console.log("draw");
            gameObj.isGameEnd = true;
        }
    }


    let gameServiceFactory = {};
    gameServiceFactory.startGame = startGame;
    gameServiceFactory.initGameData = initGameData;
    gameServiceFactory.nextStep = nextStep;
    gameServiceFactory.gameObj = gameObj;
    gameServiceFactory.resetGame = resetGame;
    gameServiceFactory.newGame = newGame;

    return gameServiceFactory;
}

export default GameService;