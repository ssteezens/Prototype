(function() {
    console.log("starting");

    var drawInProgress = false;
    var currentRectangle = new Rectangle;
    var canvas = document.getElementById("TheCanvas");
    var context = canvas.getContext("2d");
    var infoDisplay = document.getElementById("InfoDisplay");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

   // event handler
   canvas.onmousedown = function(e) {
     console.log("hello", e);
     drawInProgress = true;

     currentRectangle = new Rectangle;
     currentRectangle.topLeft = new Point(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
     
     drawLine(currentRectangle.topLeft.x, currentRectangle.topLeft.y, 10, 100);
   };
   canvas.onmouseup = function(e) {
     drawInProgress = false;
     
     var x = e.clientX - canvas.offsetLeft;
     var y = e.clientY - canvas.offsetTop;

     if(x < currentRectangle.topLeft.x)
        x = currentRectangle.topLeft.x;
     if(y < currentRectangle.topLeft.y)
        y = currentRectangle.topLeft.y;

     currentRectangle.bottomRight = new Point(x, y);
     currentRectangle.bottomLeft = new Point(currentRectangle.topLeft.x, y);
     currentRectangle.topRight = new Point(x, currentRectangle.topLeft.y);

     drawRectangle(currentRectangle);
   };
   canvas.onmousemove = function(e) {
     //console.log("onmousemove", e);
     if(drawInProgress) {

     }

     var x = e.clientX - canvas.offsetLeft;
     var y = e.clientY - canvas.offsetTop;
     var point = new Point(x, y);

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

   //
   // object prototypes
   //
   function Rectangle() {
     this.topLeft = new Point(0,0);
     this.bottomLeft = new Point(0,0);
     this.topRight = new Point(0,0);
     this.bottomRight = new Point(0,0);
   }

   function Point(x, y) {
     this.x = x;
     this.y = y;
   }

})();