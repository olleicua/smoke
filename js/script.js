window.Smoke = window.Smoke || {};

(function() {


  Smoke.init = function () {

    this.canvas = document.querySelector('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    var ctx = this.canvas.getContext('2d');

  };

  Smoke.init();

})();
