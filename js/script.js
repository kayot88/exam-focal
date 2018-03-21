$(document).ready(function() {

  var container = document.getElementById('container');
  var inner = document.getElementById('inner');

  var onMouseEnterHandler = function(event) {
    update(event);
  };
  var onMouseLeaveHandler = function() {
    inner.style = "";
  };
  var onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

  container.onmouseenter = onMouseEnterHandler;
  container.onmouseleave = onMouseLeaveHandler;
  container.onmousemove = onMouseMoveHandler;

  var counter = 0;
  var updateRate = 10;
  var isTimeToUpdate = function() {
    return counter++ % updateRate === 0;
  };

// Init
var container = document.getElementById('container');
var inner = document.getElementById('inner');
// Mouse 
var mouse = {
  _x: 0,
  _y: 0,
  x: 0,
  y: 0,
  updatePosition: function(event) {
    var e = event || window.event;
    this.x = e.clientX - this._x;
    this.y = (e.clientY - this._y) * -1;
  },
  setOrigin: function(e) {
    this._x = e.offsetLeft + Math.floor(e.offsetWidth/2);
    this._y = e.offsetTop + Math.floor(e.offsetHeight/2);
  },
  show: function() { return '(' + this.x + ', ' + this.y + ')'; }
}
// Track the mouse position relative to the center of the container.
mouse.setOrigin(container);

var update = function(event) {
  mouse.updatePosition(event);
  updateTransformStyle(
    (mouse.y / inner.offsetHeight/2).toFixed(2),
    (mouse.x / inner.offsetWidth/2).toFixed(2)
    );
};

var updateTransformStyle = function(x, y) {
  var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
  inner.style.transform = style;
  inner.style.webkitTransform = style;
  inner.style.mozTransform = style;
  inner.style.msTransform = style;
  inner.style.oTransform = style;
};
$('.nav-toggle').on('click', function() {
  $('.nav').toggleClass('open');
  $('.nav>.interior>.nav-toggle').toggleClass('nav-toggle--open');
  $('#container').toggleClass('open'); 
  // var elem = document.getElementById('container');
  // elem.style.cssText += 'z-index: -1;';
});

const crazyButtons = document.querySelectorAll('.btn-crazy');

    // define our functions
    function goCrazy() {
      // get a random number for the left offset
      // random num for top offset
      const offsetLeft = Math.random() * (window.innerWidth - this.clientWidth);
      const offsetTop  = Math.random() * (window.innerHeight - this.clientHeight);

      console.log(offsetLeft, offsetTop);

      // apply those numbers to the button
      this.style.top = offsetTop + 'px';
      this.style.left = offsetLeft + 'px';
    }

    // add event listeners
    crazyButtons.forEach(button => button.addEventListener('mouseenter', goCrazy));

//fullscroll


  });




