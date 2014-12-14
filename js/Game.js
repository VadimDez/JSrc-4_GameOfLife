/**
 * Game actions
 *
 * @param {HTMLElement} $grid
 * @param {int}         rows
 * @param {int}         columns
 * @constructor
 */
var Game = function ($grid, rows, columns) {
    this.$grid = $grid;
    this.rows = rows;
    this.columns = columns;
    this.board = new Board(this.rows, this.columns);

    this.init = function () {
        this.$grid.style.width = this.columns * 12 + 'px'; // 10px for cell and +2 for borders
        this.$grid.style.height = this.rows * 12 + 'px'; // 10px for cell and +2 for borders
        this.board.randomize();
        this.render();
    };
    this.render = function () {
        var container = document.createElement('div'),
            column;

        for (var c = 0; c < this.columns; c++) {
            column = '';
            for (var r = 0; r < this.rows; r++) {
                column += '<div class="row' + ((this.board.getValue(r, c)) ? ' live' : '') + '"></div>';
            }
            container.insertAdjacentHTML('beforeend', '<div class="column">' + column + '</div>');
        }

        this.$grid.innerHTML = container.innerHTML;
    };
    this.cycle = function () {
        this.render();
        this.board.applyRules();
    };
    this.play = function () {
        var _this = this;
        _this.stop();
        this.cycleInterval = setInterval(function () {
            _this.cycle();
        }, 200);
    };
    this.stop = function () {
        if (this.cycleInterval)
            clearInterval(this.cycleInterval);
    };
    this.step = function () {
        this.stop();
        this.cycle();
    };

    this.init(); // call init
};