gameModel.$inject = ['Cell'];


function gameModel(Cell) {

    function Game(fieldSize, isBusy, playerSide, isGameEnd, winner, fieldState) {
        this.fieldSize = fieldSize;
        this.isBusy = isBusy;
        this.playerSide = playerSide;
        this.isGameEnd = isGameEnd;
        this.winner = winner;
        this.fieldState = fieldState;
    }

    Game.build = function (data) {
        let fieldState = [];

        let id = 0;
        for(let i = 0; i < data.fieldSize; i++){
            let row = [];
            for(let y = 0; y < data.fieldSize; y++){
                let cell = Cell.build({figure:data.fieldState[i][y].figure, id: data.fieldState[i][y].id, isMarked:data.fieldState[i][y].isMarked, isHighlighted: data.fieldState[i][y].isHighlighted});
                row.push(cell);
            }
            fieldState.push(row);
        }


        return new Game(
            data.fieldSize,
            data.isBusy,
            data.playerSide,
            data.isGameEnd,
            data.winner,
            fieldState
        );
    };

    return Game;
}

export default gameModel;