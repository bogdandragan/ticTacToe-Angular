
function cellModel() {

    function Cell(figure, id, isMarked, isHighlighted) {
        this.figure = figure;
        this.id = id;
        this.isMarked = isMarked;
        this.isHighlighted = isHighlighted;
    }

    Cell.build = function (data) {
        return new Cell(
            data.figure,
            data.id,
            data.isMarked,
            data.isHighlighted
        );
    };

    return Cell;
}

export default cellModel;