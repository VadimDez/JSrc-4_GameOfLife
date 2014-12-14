/**
 * Created by Vadym on 06/12/14.
 */

it('can create board', function () {
    var board = new Board();
    expect(typeof board).toBe("object");
});

it('can set rows and columns', function () {
    var rows = 3,
        columns = 3,
        board = new Board(rows, columns);

    expect(board.rows).toBe(rows);
    expect(board.columns).toBe(columns);
});

it('can set rows and columns', function () {
    var rows = 4,
        columns = 3,
        board = new Board(rows, columns);

    expect(board.rows).toBe(rows);
    expect(board.columns).toBe(columns);
});

it('can get the main matrix', function () {
    var rows = 4,
        columns = 5,
        board = new Board(rows, columns);

    expect(typeof board.matrix).toBe("object");
});

it('can set the main matrix properly', function () {
    var rows = 4,
        columns = 5,
        board = new Board(rows, columns);
    board.createMatrix();

    expect(board.matrix.length).toBe(rows);
    expect(board.matrix[0].length).toBe(columns);
});

it('can set the main matrix properly with different params', function () {
    var rows = 7,
        columns = 3,
        board = new Board(rows, columns);
    board.createMatrix();

    expect(board.matrix.length).toBe(rows);
    expect(board.matrix[0].length).toBe(columns);
});

it('can get bool value from cell', function () {
    var board = new Board(3, 3);
    board.createMatrix();

    expect(typeof board.getValue(0, 0)).toBe("boolean");
});

it('can get value from cell', function () {
    var board = new Board(3, 3);
    board.createMatrix();

    expect(board.getValue(0, 0)).toBe(false);
    expect(board.getValue(0, 1)).toBe(false);
    expect(board.getValue(1, 1)).toBe(false);
});

it('out of bounds - empty neighbor', function () {
    var board = new Board(3,3);
    board.createMatrix();

    expect(board.getValue(-1, 0)).toBe(false);
});

it('can set value to cell', function () {
    var board = new Board(3, 3),
        row = 0,
        column = 0;
    board.createMatrix();
    board.setValue(row, column, true);

    expect(board.getValue(row, column)).toBe(true);
});

it('can set value to cell with different params', function () {
    var board = new Board(3, 3),
        row = 0,
        column = 1;
    board.createMatrix();
    board.setValue(row, column, true);

    expect(board.getValue(row, column)).toBe(true);
});

describe('count neighbors', function () {
    it('can count neighbors', function () {
        var board = new Board(3,3);
        board.createMatrix();

        board.setValue(0, 0, true);
        board.setValue(0, 1, true);
        board.setValue(0, 2, true);

        expect(board.getNeighbors(1, 1)).toBe(3);
    });
    it('can count neighbors with different params', function () {
        var board = new Board(3,3);
        board.createMatrix();

        board.setValue(0, 0, true);
        board.setValue(0, 1, true);
        board.setValue(0, 2, true);
        board.setValue(1, 0, true);

        expect(board.getNeighbors(1, 1)).toBe(4);
    });
    it('diff params #3', function () {
        var board = new Board(3,3);
        board.createMatrix();

        expect(board.getNeighbors(0, 0)).toBe(0);
    });
});

describe('less than two neighbors - dies', function () {
    it('#1', function () {
        var board = new Board(3, 3);
        board.createMatrix();
        board.setValue(1, 1, true);
        board.applyRules();

        expect(board.getValue(1, 1)).toBe(false);
    });
    it('#2 with diff params', function () {
        var board = new Board(3, 3);
        board.createMatrix();
        board.setValue(0, 0, true);
        board.applyRules();

        expect(board.getValue(0, 0)).toBe(false);
    });
});

describe('two or three - cell lives', function () {
    it('#1', function () {
        var board = new Board(3, 3);
        board.createMatrix();
        board.setValue(0, 0, true);
        board.setValue(1, 1, true);
        board.setValue(0, 2, true);
        board.applyRules();

        expect(board.getValue(1, 1)).toBe(true);
    });
    it('#2', function () {
        var board = new Board(3, 3);
        board.createMatrix();
        board.setValue(1, 1, true);
        board.setValue(1, 2, true);
        board.setValue(0, 2, true);
        board.applyRules();

        expect(board.getValue(1, 2)).toBe(true);
    });
});
describe('more than 3 neighbors - cell dies', function () {
    it('#1', function () {
        var board = new Board(3, 3);
        board.createMatrix();
        board.setValue(0, 0, true);
        board.setValue(0, 1, true);
        board.setValue(0, 2, true);
        board.setValue(1, 0, true);
        board.setValue(1, 1, true);
        board.setValue(1, 2, true);
        board.setValue(2, 0, true);
        board.setValue(2, 1, true);
        board.setValue(2, 2, true);
        board.applyRules();

        expect(board.getValue(1, 1)).toBe(false);
    });
    it('#2', function () {
        var board = new Board(3, 3);
        board.createMatrix();
        board.setValue(0, 0, true);
        board.setValue(0, 1, true);
        board.setValue(0, 2, true);
        board.setValue(1, 0, true);
        board.setValue(1, 1, true);
        board.setValue(1, 2, true);
        board.applyRules();

        expect(board.getValue(0, 1)).toBe(false);
    });
});
describe('3 neighbors - dead cell comes alive', function () {
    it('#1', function () {
        var board = new Board(3, 3);
        board.createMatrix();
        board.setValue(0, 0, true);
        board.setValue(0, 1, false);
        board.setValue(0, 2, true);
        board.setValue(1, 0, true);
        board.applyRules();

        expect(board.getValue(0, 1)).toBe(true);
    });
    it('#2', function () {
        var board = new Board(3, 3);
        board.createMatrix();
        board.setValue(0, 0, false);
        board.setValue(0, 1, true);
        board.setValue(1, 0, true);
        board.setValue(1, 1, true);
        board.applyRules();

        expect(board.getValue(0, 0)).toBe(true);
    });
});

describe('check that randomize works', function () {
    it('check if initialize', function () {
        var board = new Board(3, 3),
            alive = 0;
        board.randomize();

        for (var r = 0; r < board.rows; r++) {
            for (var c = 0; c < board.columns; c++) {
                alive += board.getValue(r, c);
            }
        }

        expect(alive).toBeGreaterThan(0);
    });

    it('check one cycle', function () {
        var board = new Board(3, 3),
            aliveBefore = 0,
            aliveAfter = 0,
            c, r;
        board.randomize();

        for (r = 0; r < board.rows; r++) {
            for (c = 0; c < board.columns; c++) {
                aliveBefore += board.getValue(r, c);
            }
        }

        board.applyRules();

        for (r = 0; r < board.rows; r++) {
            for (c = 0; c < board.columns; c++) {
                aliveAfter += board.getValue(r, c);
            }
        }

        expect(aliveBefore == aliveAfter).toBe(false);
    });
});