window.Smoke = window.Smoke || {};

(function() {

  window.SMOKE_LOOP_INTERVAL = 100;
  window.SMOKE_CANVAS_HEIGHT = 300;
  window.SMOKE_CANVAS_WIDTH = 300;

  Smoke.init = function () {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = SMOKE_CANVAS_WIDTH;
    this.canvas.height = SMOKE_CANVAS_HEIGHT;

    this.ctx = this.canvas.getContext('2d');

    this.initGrid();
    this.initClickHandler();
    this.smokeLoop();
  };

  Smoke.initGrid = function() {
    this.grid = [];
    for (var i = 0; i < SMOKE_CANVAS_HEIGHT; i++) {
      this.grid.push([]);
      for (var j = 0; j < SMOKE_CANVAS_WIDTH; j++) {
        this.grid[i].push(Math.floor(Math.random() * 25));
      }
    }
  };

  Smoke.initClickHandler = function() {
    var that = this;
    this.canvas.addEventListener('click', function(e) {
      var y = e.offsetY;
      var x = e.offsetX;
      var d = 255;
      while (d > that.grid[y][x]) {
        that.grid[y][x] = d;
        var direction = that.randomDirectionFor(y, x);
        y += direction[0];
        x += direction[1];
        d -= Math.floor(Math.random() * Math.min(d, 10));
      }
    });
  };

  Smoke.smokeLoop = function() {
    var that = this;
    this.spread();
    this.draw();
    setTimeout(function() { that.smokeLoop() }, SMOKE_LOOP_INTERVAL);
  };

  Smoke.spread = function() {
    var newGrid = [];
    for (var i = 0; i < SMOKE_CANVAS_HEIGHT; i++) {
      newGrid.push([]);
      for (var j = 0; j < SMOKE_CANVAS_WIDTH; j++) {
        newGrid[i].push(0);
      }
    }
    for (var i = 0; i < SMOKE_CANVAS_HEIGHT; i++) {
      for (var j = 0; j < SMOKE_CANVAS_WIDTH; j++) {
        if (this.grid[i][j] > 0) {
          var spreadAmmount = Math.floor(Math.random() * this.grid[i][j]);
          var spreadDirection = this.randomDirectionFor(i, j);
          newGrid[i][j] += this.grid[i][j] - spreadAmmount;
          newGrid[i + spreadDirection[0]][j + spreadDirection[1]] +=
            spreadAmmount;
        }
      }
    }
    this.grid = newGrid;
  };

  Smoke.randomDirectionFor = function (y, x) {
    var options = [];
    if (y > 0) options.push([-1, 0]);
    if (x > 0) options.push([0, -1]);
    if (y < SMOKE_CANVAS_HEIGHT - 1) options.push([1, 0]);
    if (x < SMOKE_CANVAS_WIDTH - 1) options.push([0, 1]);
    return options[Math.floor(Math.random() * options.length)];
  }

  Smoke.draw = function() {
    for (var i = 0; i < SMOKE_CANVAS_HEIGHT; i++) {
      for (var j = 0; j < SMOKE_CANVAS_WIDTH; j++) {
        var d = this.grid[i][j];
        this.ctx.fillStyle = 'rgb(' + d + ', ' + d + ', ' + d +')';
        this.ctx.fillRect(j, i, 1, 1);
      }
    }
  };

  Smoke.init();

})();
