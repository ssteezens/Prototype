(function () {
  console.log("starting");

  var drawInProgress = false;
  var currentRectangle = new Rectangle;
  var canvas = document.getElementById("TheCanvas");
  var context = canvas.getContext("2d");
  var infoDisplay = document.getElementById("InfoDisplay");
  
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  var previousCanvasState = context.getImageData(0, 0, canvas.width, canvas.height);

  // canvas event handlers
  canvas.onmousedown = function (e) {
    drawInProgress = true;

    currentRectangle = new Rectangle;
    currentRectangle.topLeft = new Point(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

    drawLine(currentRectangle.topLeft.x, currentRectangle.topLeft.y, 10, 100);
  };
  canvas.onmouseup = function (e) {
    drawInProgress = false;

    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;

    if (x < currentRectangle.topLeft.x)
      x = currentRectangle.topLeft.x;
    if (y < currentRectangle.topLeft.y)
      y = currentRectangle.topLeft.y;

    currentRectangle.bottomRight = new Point(x, y);
    currentRectangle.fromTopLeftBottomRight(currentRectangle.topLeft, currentRectangle.bottomRight);

    drawRectangle(currentRectangle);

    saveCanvasState();
  };
  canvas.onmousemove = function (e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    var point = new Point(x, y);

    var bottomRightX = x;
    var bottomRightY = y;
    if (x < currentRectangle.topLeft.x)
      bottomRightX = currentRectangle.topLeft.x;
    if (y < currentRectangle.topLeft.y)
      bottomRightY = currentRectangle.topLeft.y;
    
    currentRectangle.bottomRight = new Point(bottomRightX, bottomRightY);
    currentRectangle.fromTopLeftBottomRight(currentRectangle.topLeft, currentRectangle.bottomRight);

    if (drawInProgress) {
      restorePreviousCanvasState();
      drawRectangle(currentRectangle);
    }

    infoDisplay.innerHTML = "X: " + point.x + " Y: " + point.y;
  };

  /*
  *  Draw the outline of a rectangle.
  */
  function drawRectangle(rectangle) {
    // draw left line
    drawLine(rectangle.topLeft, rectangle.bottomLeft);
    // draw top line
    drawLine(rectangle.topLeft, rectangle.topRight);
    // draw bottom line
    drawLine(rectangle.bottomLeft, rectangle.bottomRight);
    // draw right line
    drawLine(rectangle.bottomRight, rectangle.topRight);
  }

  /*
  *  Draw a line to connect two points.
  */
  function drawLine(pointOne, pointTwo) {
    context.beginPath();
    context.moveTo(pointOne.x, pointOne.y);
    context.lineTo(pointTwo.x, pointTwo.y);
    context.stroke();
    context.closePath();
  }

  /*
  * Save the current canvas state.
  */
  function saveCanvasState() {
    previousCanvasState = context.getImageData(0, 0, canvas.width, canvas.height);
  }

  /*
  * Restore to previous canvas state.
  */
  function restorePreviousCanvasState() {
    context.putImageData(previousCanvasState, 0, 0);
  }

  /*
  * Rectangle object.
  */
  function Rectangle() {
    this.topLeft = new Point(0, 0);
    this.bottomLeft = new Point(0, 0);
    this.topRight = new Point(0, 0);
    this.bottomRight = new Point(0, 0);

    /* 
    * Create a rectange object from the top left and bottom right points.
    */
    this.fromTopLeftBottomRight = function(topLeft, bottomRight) {
      this.topLeft = topLeft;
      this.bottomRight = bottomRight;
      this.bottomLeft = new Point(this.topLeft.x, this.bottomRight.y);
      this.topRight = new Point(this.bottomRight.x, this.topLeft.y);
    }
  }

  /*
  * Point object.
  */
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

})();