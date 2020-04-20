(function() {
    console.log("starting");

    var drawInProgress = false;
    var currentRect = new Rect;
    var currentRectangle = new Rectangle();
    var canvas = document.getElementById("TheCanvas");
    var context = canvas.getContext("2d");
    var infoDisplay = document.getElementById("InfoDisplay");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

   // event handler
   canvas.onmousedown = function(e) {
     console.log("hello", e);
     drawInProgress = true;

     currentRect.x = e.clientX - canvas.offsetLeft;
     currentRect.y = e.clientY - canvas.offsetTop;
     // todo: set width and height from mouse move delta
     currentRect.width = 10;
     currentRect.height = 100;

     drawLine(rect.x, rect.y, rect.width, rect.height);
   };
   canvas.onmouseup = function(e) {
     drawInProgress = false;
     

   };
   canvas.onmousemove = function(e) {
     //console.log("onmousemove", e);
     if(drawInProgress) {

     }
     
     var rect = new Rect;
     rect.x = e.clientX - canvas.offsetLeft;
     rect.y = e.clientY - canvas.offsetTop;
     rect.width = 10;
     rect.height = 10;

     infoDisplay.innerHTML = "X: " + rect.x + " Y: " + rect.y;
   };

   /*
   *  Draw a line at the x and y coordinates.
   */
   function drawLine(x, y, width, height) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + width, y + height);
      context.stroke();
      context.closePath();
   }

   //
   // object prototypes
   //
   function Rect() {
       this.x = 0;
       this.y = 0;
       this.width = 0.0;
       this.height = 0.0;
   }

   function Rectangle() {
     this.topLeft = new Point();
     this.bottomLeft = new Point();
     this.topRight = new Point();
     this.bottomRight = new Point();
   }


})();