System.register("CanvasHistory", [], function (exports_1, context_1) {
    "use strict";
    var CanvasHistoryManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            CanvasHistoryManager = /** @class */ (function () {
                /**
                 * Initializes canvas with a specified draw history.
                 */
                function CanvasHistoryManager(canvasContext) {
                    this.drawHistory = [];
                    this.currentStateIndex = 0;
                    this.canvasContext = canvasContext;
                }
                /**
                 * Undo the last canvas draw.
                 */
                CanvasHistoryManager.prototype.undo = function () {
                    if (this.currentStateIndex > 0)
                        this.currentStateIndex--;
                    this.canvasContext.putImageData(this.getCurrentState(), 0, 0);
                };
                /**
                 * Redo the last canvas draw.
                 */
                CanvasHistoryManager.prototype.redo = function () {
                    if (this.currentStateIndex < this.drawHistory.length - 1)
                        this.currentStateIndex++;
                    this.canvasContext.putImageData(this.getCurrentState(), 0, 0);
                };
                /**
                 * Add the image data to the draw history.
                 * @param imageData The image data to add to the draw history.
                 */
                CanvasHistoryManager.prototype.add = function (imageData) {
                    // remove all history from currentStateIndex to drawHistory.length
                    if (this.currentStateIndex < this.drawHistory.length - 1)
                        this.drawHistory.splice(this.currentStateIndex, this.drawHistory.length - this.currentStateIndex - 1);
                    // add to drawHistory
                    this.drawHistory.push(imageData);
                    this.currentStateIndex = this.drawHistory.length - 1;
                };
                /**
                 * Retrieve the canvas's current draw state.
                 */
                CanvasHistoryManager.prototype.getCurrentState = function () {
                    return this.drawHistory[this.currentStateIndex];
                };
                return CanvasHistoryManager;
            }());
            exports_1("CanvasHistoryManager", CanvasHistoryManager);
        }
    };
});
System.register("Point", [], function (exports_2, context_2) {
    "use strict";
    var Point;
    var __moduleName = context_2 && context_2.id;
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
            exports_2("Point", Point);
        }
    };
});
System.register("DraggableElement", ["Point"], function (exports_3, context_3) {
    "use strict";
    var Point_1, DraggableElement;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (Point_1_1) {
                Point_1 = Point_1_1;
            }
        ],
        execute: function () {
            DraggableElement = /** @class */ (function () {
                /**
                 *
                 */
                function DraggableElement(element) {
                    var _this = this;
                    this.mouseDownEventHandler = function (e) {
                        _this.isDragging = true;
                        var x = e.clientX;
                        var y = e.clientY;
                        _this.mouseDownPoint = new Point_1.Point(x, y);
                    };
                    this.mouseUpEventHandler = function (e) {
                        _this.isDragging = false;
                    };
                    this.mouseMoveEventHandler = function (e) {
                        if (_this.isDragging)
                            _this.dragEventHandler(e);
                    };
                    this.dragEventHandler = function (e) {
                        var x = e.clientX;
                        var y = e.clientY;
                        var deltaY = 0;
                        var deltaX = 0;
                        var currentPoint = new Point_1.Point(x, y);
                        _this.element.style.top = currentPoint.y + "px";
                        _this.element.style.left = currentPoint.x + "px";
                    };
                    this.element = element;
                    this.isDragging = false;
                    this.element.addEventListener("mousedown", this.mouseDownEventHandler);
                    document.addEventListener("mouseup", this.mouseUpEventHandler);
                    document.addEventListener("mousemove", this.mouseMoveEventHandler);
                }
                return DraggableElement;
            }());
            exports_3("DraggableElement", DraggableElement);
        }
    };
});
System.register("MorphingPolygon", ["Point"], function (exports_4, context_4) {
    "use strict";
    var Point_2, MorphingPolygon;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (Point_2_1) {
                Point_2 = Point_2_1;
            }
        ],
        execute: function () {
            MorphingPolygon = /** @class */ (function () {
                /**
                 *  Creates a rectangle from two points.
                 */
                function MorphingPolygon(point1, point2) {
                    if (point1 === void 0) { point1 = new Point_2.Point(0, 0); }
                    if (point2 === void 0) { point2 = new Point_2.Point(0, 0); }
                    // point 1 is topleft and point 2 is bottom right
                    if (point1.x < point2.x && point1.y < point2.y) {
                        this.topLeft = point1;
                        this.bottomRight = point2;
                        this.bottomLeft = new Point_2.Point(this.topLeft.x, this.bottomRight.y);
                        this.topRight = new Point_2.Point(this.bottomRight.x, this.topLeft.y);
                    }
                    // point 1 is bottom left and point 2 top right
                    if (point1.x < point2.x && point1.y > point2.y) {
                        this.bottomLeft = point1;
                        this.topRight = point2;
                        this.topLeft = new Point_2.Point(this.bottomLeft.x, this.topRight.y);
                        this.bottomRight = new Point_2.Point(this.bottomLeft.y, this.topRight.x);
                    }
                    // point 1 is top right and point 2 is bottom left
                    if (point1.x > point2.x && point1.y < point2.y) {
                        this.topRight = point1;
                        this.bottomLeft = point2;
                        this.topLeft = new Point_2.Point(this.bottomLeft.x, this.topRight.y);
                        this.bottomRight = new Point_2.Point(this.bottomLeft.y, this.topRight.x);
                    }
                    // point 1 is bottom right and point 2 is top left
                    if (point1.x > point2.x && point1.y > point2.y) {
                        this.bottomRight = point1;
                        this.topLeft = point2;
                        this.bottomLeft = new Point_2.Point(this.topLeft.x, this.bottomRight.y);
                        this.topRight = new Point_2.Point(this.bottomRight.x, this.topLeft.y);
                    }
                }
                return MorphingPolygon;
            }());
            exports_4("MorphingPolygon", MorphingPolygon);
        }
    };
});
System.register("Rectangle", ["Point"], function (exports_5, context_5) {
    "use strict";
    var Point_3, Rectangle;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (Point_3_1) {
                Point_3 = Point_3_1;
            }
        ],
        execute: function () {
            Rectangle = /** @class */ (function () {
                /**
                 *  Creates a rectangle from two points.
                 */
                function Rectangle(point1, point2) {
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
                return Rectangle;
            }());
            exports_5("Rectangle", Rectangle);
        }
    };
});
System.register("PrototypeCanvas", ["Point", "MorphingPolygon", "CanvasHistory"], function (exports_6, context_6) {
    "use strict";
    var Point_4, MorphingPolygon_1, CanvasHistory_1, PrototypeCanvas;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (Point_4_1) {
                Point_4 = Point_4_1;
            },
            function (MorphingPolygon_1_1) {
                MorphingPolygon_1 = MorphingPolygon_1_1;
            },
            function (CanvasHistory_1_1) {
                CanvasHistory_1 = CanvasHistory_1_1;
            }
        ],
        execute: function () {
            PrototypeCanvas = /** @class */ (function () {
                /**
                 * Default constructor.  Initializes the canvas and context.
                 */
                function PrototypeCanvas() {
                    var _this = this;
                    /**
                     * Event handler for the key down event.  Manages keyboard shortcuts
                     */
                    this.keyboardDownEventHandler = function (e) {
                        if (e.keyCode == 90 && e.ctrlKey)
                            _this.canvasHistory.undo();
                        if (e.keyCode == 89 && e.ctrlKey)
                            _this.canvasHistory.redo();
                    };
                    /**
                     * Event handler
                     */
                    this.saveButtonClickEventHandler = function (e) {
                        var image = _this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                        window.location.href = image;
                    };
                    /**
                     * Event handler for the undo button. Calls the canvas history to undo the last action.
                     */
                    this.undoButtonClickEventHandler = function (e) {
                        _this.canvasHistory.undo();
                    };
                    /**
                     * Event handler for the redo button. Calls the canvas hsitory to redo any undone action.
                     */
                    this.redoButtonClickEventHandler = function (e) {
                        _this.canvasHistory.redo();
                    };
                    /**
                     * Event handler for canvas mouse down event.
                     */
                    this.mouseDownEventHandler = function (e) {
                        _this.drawInProgress = true;
                        var x = e.clientX - _this.canvas.offsetLeft;
                        var y = e.clientY - _this.canvas.offsetTop;
                        _this.mouseDownPoint = new Point_4.Point(x, y);
                    };
                    /**
                     * Event handler for canvas mouse move event.
                     */
                    this.mouseMoveEventHandler = function (e) {
                        var x = e.clientX - _this.canvas.offsetLeft;
                        var y = e.clientY - _this.canvas.offsetTop;
                        _this.mouseUpPoint = new Point_4.Point(x, y);
                        _this.currentPolygon = new MorphingPolygon_1.MorphingPolygon(_this.mouseDownPoint, _this.mouseUpPoint);
                        _this.infoDisplay.innerText = "X: " + x + " Y: " + y;
                        if (_this.drawInProgress) {
                            _this.context.putImageData(_this.canvasHistory.getCurrentState(), 0, 0);
                            _this.drawPolygon(_this.currentPolygon);
                        }
                    };
                    /**
                     * Event handler for canvas mouse up event.
                     */
                    this.mouseUpEventHandler = function (e) {
                        _this.drawInProgress = false;
                        var x = e.clientX - _this.canvas.offsetLeft;
                        var y = e.clientY - _this.canvas.offsetTop;
                        _this.mouseUpPoint = new Point_4.Point(x, y);
                        _this.currentPolygon = new MorphingPolygon_1.MorphingPolygon(_this.mouseDownPoint, _this.mouseUpPoint);
                        _this.drawPolygon(_this.currentPolygon);
                        _this.saveCanvasState();
                    };
                    console.log("hello");
                    this.canvas = document.getElementById('TheCanvas');
                    this.infoDisplay = document.getElementById('InfoDisplay');
                    this.context = this.canvas.getContext("2d");
                    this.currentPolygon = new MorphingPolygon_1.MorphingPolygon();
                    this.canvas.width = this.canvas.offsetWidth;
                    this.canvas.height = this.canvas.offsetHeight;
                    this.canvasHistory = new CanvasHistory_1.CanvasHistoryManager(this.context);
                    this.canvasHistory.add(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
                    this.canvas.addEventListener("mousedown", this.mouseDownEventHandler);
                    this.canvas.addEventListener("mouseup", this.mouseUpEventHandler);
                    this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler);
                    document.addEventListener("keydown", this.keyboardDownEventHandler);
                    this.undoButton = document.getElementById("UndoButton");
                    this.redoButton = document.getElementById("RedoButton");
                    this.saveButton = document.getElementById("SaveButton");
                    this.undoButton.addEventListener("click", this.undoButtonClickEventHandler);
                    this.redoButton.addEventListener("click", this.redoButtonClickEventHandler);
                    this.saveButton.addEventListener("click", this.saveButtonClickEventHandler);
                }
                /**
                 * Event handler for when the canvas is resized.
                 */
                PrototypeCanvas.prototype.canvasOnResizeEventHandler = function () {
                    this.canvas.width = this.canvas.offsetWidth;
                    this.canvas.height = this.canvas.offsetHeight;
                };
                ;
                /**
                 * Draws a rectangle on the canvas.
                 * @param polygon The polygon to draw.
                 */
                PrototypeCanvas.prototype.drawPolygon = function (polygon) {
                    // draw left line
                    this.drawLine(polygon.topLeft, polygon.bottomLeft);
                    // draw top line
                    this.drawLine(polygon.topLeft, polygon.topRight);
                    // draw bottom line
                    this.drawLine(polygon.bottomLeft, polygon.bottomRight);
                    // draw right line
                    this.drawLine(polygon.bottomRight, polygon.topRight);
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
                    this.canvasHistory.add(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
                };
                return PrototypeCanvas;
            }());
            exports_6("PrototypeCanvas", PrototypeCanvas);
        }
    };
});
System.register("main", ["PrototypeCanvas", "DraggableElement"], function (exports_7, context_7) {
    "use strict";
    var ProtoTypeCanvas_1, DraggableElement_1, prototypeCanvas, draggableElements, i, element, draggable;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (ProtoTypeCanvas_1_1) {
                ProtoTypeCanvas_1 = ProtoTypeCanvas_1_1;
            },
            function (DraggableElement_1_1) {
                DraggableElement_1 = DraggableElement_1_1;
            }
        ],
        execute: function () {
            prototypeCanvas = new ProtoTypeCanvas_1.PrototypeCanvas();
            draggableElements = document.getElementsByClassName('draggable');
            for (i = 0; i < draggableElements.length; i++) {
                element = draggableElements[i];
                draggable = new DraggableElement_1.DraggableElement(element);
            }
        }
    };
});
//# sourceMappingURL=bundle.js.map