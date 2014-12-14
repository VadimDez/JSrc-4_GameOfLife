/**
 * Created by Vadym on 06/12/14.
 */

var Board = function (rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.matrix = [];

    this.create = function (random) {
        for (var r = 0; r < rows; r++) {
            var array = [];
            for (var c = 0; c < columns; c++) {
                if (random)
                    array.push((Math.random() > 0.4));
                else
                    array.push(false);
            }
            this.matrix[r] = array;
        }
    };
    this.createMatrix = function () {
        this.create(false);
    };
    this.randomize = function () {
        this.create(true);
    };

    this.getValue = function (row, column) {
        if (row > this.rows - 1 || row < 0 || column > this.columns - 1 || column < 0)
            return false;
        return this.matrix[row][column];
    };

    this.setValue = function (row, column, value) {
        this.matrix[row][column] = value;
    };

    this.getNeighbors = function (row, column) {
        return this.getValue(row - 1, column - 1) +
            this.getValue(row - 1, column) +
            this.getValue(row - 1, column + 1) +
            this.getValue(row, column - 1) +
            this.getValue(row, column + 1) +
            this.getValue(row + 1, column - 1) +
            this.getValue(row + 1, column) +
            this.getValue(row + 1, column + 1);
    };

    this.applyRules = function () {
        var supply = new Board(this.rows, this.columns);
        supply.createMatrix();

        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.columns; c++) {
                var neighbors = this.getNeighbors(r, c),
                    value = this.getValue(r,c);

                supply.setValue(r, c, value);

                if (neighbors < 2)
                    supply.setValue(r, c, false);
                else if ((neighbors == 2 || neighbors == 3) && value)
                    supply.setValue(r, c, true);
                else if (neighbors == 3 && !value)
                    supply.setValue(r, c, true);
                else if (neighbors > 3 && value)
                    supply.setValue(r, c, false);
            }
        }

        this.matrix = supply.matrix;
    }
};