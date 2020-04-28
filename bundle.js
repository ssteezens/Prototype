System.register("Point", [], function (exports_1, context_1) {
    "use strict";
    var Point;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Point = /** @class */ (function () {
                function Point(x, y) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    this.x = x;
                    this.y = y;
                }
                return Point;
            }());
            exports_1("Point", Point);
        }
    };
});
System.register("Rectangle", ["Point"], function (exports_2, context_2) {
    "use strict";
    var Point_1, Rectangle;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (Point_1_1) {
                Point_1 = Point_1_1;
            }
        ],
        execute: function () {
            Rectangle = /** @class */ (function () {
                /**
                 *  Creates a rectangle from two points.
                 */
                function Rectangle(point1, point2) {
                    if (point1 === void 0) { point1 = new Point_1.Point(0, 0); }
                    if (point2 === void 0) { point2 = new Point_1.Point(0, 0); }
                    // point 1 is topleft and point 2 is bottom right
                    if (point1.x < point2.x && point1.y < point2.y) {
                        this.topLeft = point1;
                        this.bottomRight = point2;
                        this.bottomLeft = new Point_1.Point(this.topLeft.x, this.bottomRight.y);
                        this.topRight = new Point_1.Point(this.bottomRight.x, this.topLeft.y);
                    }
                    // point 1 is bottom left and point 2 top right
                    if (point1.x < point2.x && point1.y > point2.y) {
                        this.bottomLeft = point1;
                        this.topRight = point2;
                        this.topLeft = new Point_1.Point(this.bottomLeft.x, this.topRight.y);
                        this.bottomRight = new Point_1.Point(this.bottomLeft.y, this.topRight.x);
                    }
                    // point 1 is top right and point 2 is bottom left
                    if (point1.x > point2.x && point1.y < point2.y) {
                        this.topRight = point1;
                        this.bottomLeft = point2;
                        this.topLeft = new Point_1.Point(this.bottomLeft.x, this.topRight.y);
                        this.bottomRight = new Point_1.Point(this.bottomLeft.y, this.topRight.x);
                    }
                    // point 1 is bottom right and point 2 is top left
                    if (point1.x > point2.x && point1.y > point2.y) {
                        this.bottomRight = point1;
                        this.topLeft = point2;
                        this.bottomLeft = new Point_1.Point(this.topLeft.x, this.bottomRight.y);
                        this.topRight = new Point_1.Point(this.bottomRight.x, this.topLeft.y);
                    }
                }
                return Rectangle;
            }());
            exports_2("Rectangle", Rectangle);
        }
    };
});
System.register("PrototypeCanvas", ["Point", "Rectangle"], function (exports_3, context_3) {
    "use strict";
    var Point_2, Rectangle_1, PrototypeCanvas;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (Point_2_1) {
                Point_2 = Point_2_1;
            },
            function (Rectangle_1_1) {
                Rectangle_1 = Rectangle_1_1;
            }
        ],
        execute: function () {
            PrototypeCanvas = /** @class */ (function () {
                /**
                 * Default constructor.  Initializes the canvas and context.
                 */
                function PrototypeCanvas() {
                    var _this = this;
                    this.drawHistory = [];
                    /**
                     * Event handler for canvas mouse down event.
                     */
                    this.mouseDownEventHandler = function (e) {
                        _this.drawInProgress = true;
                        var x = e.clientX - _this.canvas.offsetLeft;
                        var y = e.clientY - _this.canvas.offsetTop;
                        _this.mouseDownPoint = new Point_2.Point(x, y);
                    };
                    /**
                     * Event handler for canvas mouse move event.
                     */
                    this.mouseMoveEventHandler = function (e) {
                        var x = e.clientX - _this.canvas.offsetLeft;
                        var y = e.clientY - _this.canvas.offsetTop;
                        _this.mouseUpPoint = new Point_2.Point(x, y);
                        _this.currentRectangle = new Rectangle_1.Rectangle(_this.mouseDownPoint, _this.mouseUpPoint);
                        if (_this.drawInProgress) {
                            _this.context.putImageData(_this.currentCanvasState, 0, 0);
                            _this.drawRectangle(_this.currentRectangle);
                        }
                    };
                    /**
                     * Event handler for canvas mouse up event.
                     */
                    this.mouseUpEventHandler = function (e) {
                        _this.drawInProgress = false;
                        var x = e.clientX - _this.canvas.offsetLeft;
                        var y = e.clientY - _this.canvas.offsetTop;
                        _this.mouseUpPoint = new Point_2.Point(x, y);
                        _this.currentRectangle = new Rectangle_1.Rectangle(_this.mouseDownPoint, _this.mouseUpPoint);
                        _this.drawRectangle(_this.currentRectangle);
                        _this.saveCanvasState();
                    };
                    console.log("hello");
                    this.canvas = document.getElementById('TheCanvas');
                    this.context = this.canvas.getContext("2d");
                    this.currentRectangle = new Rectangle_1.Rectangle();
                    this.canvas.width = this.canvas.offsetWidth;
                    this.canvas.height = this.canvas.offsetHeight;
                    this.currentCanvasState = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
                    this.canvas.addEventListener("mousedown", this.mouseDownEventHandler);
                    this.canvas.addEventListener("mouseup", this.mouseUpEventHandler);
                    this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler);
                }
                /**
                 * Draws a rectangle on the canvas.
                 * @param rectangle The rectangle to draw.
                 */
                PrototypeCanvas.prototype.drawRectangle = function (rectangle) {
                    // draw left line
                    this.drawLine(rectangle.topLeft, rectangle.bottomLeft);
                    // draw top line
                    this.drawLine(rectangle.topLeft, rectangle.topRight);
                    // draw bottom line
                    this.drawLine(rectangle.bottomLeft, rectangle.bottomRight);
                    // draw right line
                    this.drawLine(rectangle.bottomRight, rectangle.topRight);
                };
                /**
                 * Draws a line connecting two points.
                 * @param pointOne The point to draw from.
                 * @param pointTwo The point to draw to.
                 */
                PrototypeCanvas.prototype.drawLine = function (pointOne, pointTwo) {
                    if (pointOne == undefined || pointTwo == undefined)
                        return;
                    this.context.beginPath();
                    this.context.moveTo(pointOne.x, pointOne.y);
                    this.context.lineTo(pointTwo.x, pointTwo.y);
                    this.context.stroke();
                    this.context.closePath();
                };
                /**
                 * Saves the current canvas state.
                 */
                PrototypeCanvas.prototype.saveCanvasState = function () {
                    this.currentCanvasState = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
                    this.drawHistory.push(this.currentCanvasState);
                };
                return PrototypeCanvas;
            }());
            exports_3("PrototypeCanvas", PrototypeCanvas);
        }
    };
});
System.register("RandomPolygon", ["Point"], function (exports_4, context_4) {
    "use strict";
    var Point_3, RandomPolygon;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (Point_3_1) {
                Point_3 = Point_3_1;
            }
        ],
        execute: function () {
            RandomPolygon = /** @class */ (function () {
                /**
                 *  Creates a rectangle from two points.
                 */
                function RandomPolygon(point1, point2) {
                    if (point1 === void 0) { point1 = new Point_3.Point(0, 0); }
                    if (point2 === void 0) { point2 = new Point_3.Point(0, 0); }
                    // point 1 is topleft and point 2 is bottom right
                    if (point1.x < point2.x && point1.y < point2.y) {
                        this.topLeft = point1;
                        this.bottomRight = point2;
                        this.bottomLeft = new Point_3.Point(this.topLeft.x, this.bottomRight.y);
                        this.topRight = new Point_3.Point(this.bottomRight.x, this.topLeft.y);
                    }
                    // point 1 is bottom left and point 2 top right
                    if (point1.x < point2.x && point1.y > point2.y) {
                        this.bottomLeft = point1;
                        this.topRight = point2;
                        this.topLeft = new Point_3.Point(this.bottomLeft.x, this.topRight.y);
                        this.bottomRight = new Point_3.Point(this.bottomLeft.y, this.topRight.x);
                    }
                    // point 1 is top right and point 2 is bottom left
                    if (point1.x > point2.x && point1.y < point2.y) {
                        this.topRight = point1;
                        this.bottomLeft = point2;
                        this.topLeft = new Point_3.Point(this.bottomLeft.x, this.topRight.y);
                        this.bottomRight = new Point_3.Point(this.bottomLeft.y, this.topRight.x);
                    }
                    // point 1 is bottom right and point 2 is top left
                    if (point1.x > point2.x && point1.y > point2.y) {
                        this.bottomRight = point1;
                        this.topLeft = point2;
                        this.bottomLeft = new Point_3.Point(this.topLeft.x, this.bottomRight.y);
                        this.topRight = new Point_3.Point(this.bottomRight.x, this.topLeft.y);
                    }
                }
                return RandomPolygon;
            }());
            exports_4("RandomPolygon", RandomPolygon);
        }
    };
});
System.register("main", ["PrototypeCanvas"], function (exports_5, context_5) {
    "use strict";
    var ProtoTypeCanvas_1, prototypeCanvas;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (ProtoTypeCanvas_1_1) {
                ProtoTypeCanvas_1 = ProtoTypeCanvas_1_1;
            }
        ],
        execute: function () {
            // look into browserify, parceljs, other types of loaders
            prototypeCanvas = new ProtoTypeCanvas_1.PrototypeCanvas();
        }
    };
});
//# sourceMappingURL=bundle.js.map