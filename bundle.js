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
System.register("CanvasInstance", [], function (exports_2, context_2) {
    "use strict";
    var CanvasInstance;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            CanvasInstance = /** @class */ (function () {
                function CanvasInstance() {
                }
                CanvasInstance.Canvas = function () {
                    return this.canvas;
                };
                CanvasInstance.SetCurrentCanvas = function (canvas) {
                    this.canvas = canvas;
                };
                CanvasInstance.Context = function () {
                    return this.currentContext;
                };
                CanvasInstance.SetCurrentContext = function (context) {
                    this.currentContext = context;
                };
                CanvasInstance.HistoryManager = function () {
                    return this.canvasHistory;
                };
                CanvasInstance.SetHistoryManager = function (historyManager) {
                    this.canvasHistory = historyManager;
                };
                return CanvasInstance;
            }());
            exports_2("CanvasInstance", CanvasInstance);
        }
    };
});
System.register("Point", [], function (exports_3, context_3) {
    "use strict";
    var Point;
    var __moduleName = context_3 && context_3.id;
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
            exports_3("Point", Point);
        }
    };
});
System.register("DraggableElement", ["Point"], function (exports_4, context_4) {
    "use strict";
    var Point_1, DraggableElement;
    var __moduleName = context_4 && context_4.id;
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
            exports_4("DraggableElement", DraggableElement);
        }
    };
});
var DrawingModes;
(function (DrawingModes) {
    DrawingModes[DrawingModes["MorphingPolygon"] = 0] = "MorphingPolygon";
    DrawingModes[DrawingModes["Rectangle"] = 1] = "Rectangle";
    DrawingModes[DrawingModes["Text"] = 2] = "Text";
    DrawingModes[DrawingModes["Line"] = 3] = "Line";
})(DrawingModes || (DrawingModes = {}));
System.register("models/Line", ["Point", "CanvasInstance"], function (exports_5, context_5) {
    "use strict";
    var Point_2, CanvasInstance_1, Line;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (Point_2_1) {
                Point_2 = Point_2_1;
            },
            function (CanvasInstance_1_1) {
                CanvasInstance_1 = CanvasInstance_1_1;
            }
        ],
        execute: function () {
            Line = /** @class */ (function () {
                /**
                 *
                 */
                function Line(point1, point2) {
                    if (point1 === void 0) { point1 = new Point_2.Point(); }
                    if (point2 === void 0) { point2 = new Point_2.Point(); }
                    this.fromPoint = point1;
                    this.toPoint = point2;
                }
                Line.prototype.draw = function () {
                    if (this.fromPoint == undefined || this.toPoint == undefined)
                        return;
                    CanvasInstance_1.CanvasInstance.Context().beginPath();
                    CanvasInstance_1.CanvasInstance.Context().moveTo(this.fromPoint.x, this.fromPoint.y);
                    CanvasInstance_1.CanvasInstance.Context().lineTo(this.toPoint.x, this.toPoint.y);
                    CanvasInstance_1.CanvasInstance.Context().stroke();
                    CanvasInstance_1.CanvasInstance.Context().closePath();
                };
                return Line;
            }());
            exports_5("Line", Line);
        }
    };
});
System.register("models/Rectangle", ["Point", "models/Line"], function (exports_6, context_6) {
    "use strict";
    var Point_3, Line_1, Rectangle;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (Point_3_1) {
                Point_3 = Point_3_1;
            },
            function (Line_1_1) {
                Line_1 = Line_1_1;
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
                Rectangle.prototype.draw = function () {
                    var left = new Line_1.Line(this.topLeft, this.bottomLeft);
                    var top = new Line_1.Line(this.topLeft, this.topRight);
                    var bottom = new Line_1.Line(this.bottomLeft, this.bottomRight);
                    var right = new Line_1.Line(this.bottomRight, this.topRight);
                    left.draw();
                    top.draw();
                    bottom.draw();
                    right.draw();
                };
                return Rectangle;
            }());
            exports_6("Rectangle", Rectangle);
        }
    };
});
System.register("tools/RectangleTool", ["Point", "CanvasInstance", "models/Rectangle"], function (exports_7, context_7) {
    "use strict";
    var Point_4, CanvasInstance_2, Rectangle_1, RectangleTool;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (Point_4_1) {
                Point_4 = Point_4_1;
            },
            function (CanvasInstance_2_1) {
                CanvasInstance_2 = CanvasInstance_2_1;
            },
            function (Rectangle_1_1) {
                Rectangle_1 = Rectangle_1_1;
            }
        ],
        execute: function () {
            RectangleTool = /** @class */ (function () {
                /**
                 *  Creates a rectangle from two points.
                 */
                function RectangleTool(point1, point2) {
                    if (point1 === void 0) { point1 = new Point_4.Point(0, 0); }
                    if (point2 === void 0) { point2 = new Point_4.Point(0, 0); }
                }
                RectangleTool.prototype.mouseDownEventHandler = function (e) {
                    this.dragInProgress = true;
                    var x = e.clientX - CanvasInstance_2.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_2.CanvasInstance.Canvas().offsetTop;
                    this.mouseDownPoint = new Point_4.Point(x, y);
                };
                RectangleTool.prototype.mouseUpEventHandler = function (e) {
                    this.dragInProgress = false;
                    var x = e.clientX - CanvasInstance_2.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_2.CanvasInstance.Canvas().offsetTop;
                    this.mouseUpPoint = new Point_4.Point(x, y);
                    this.draw();
                    CanvasInstance_2.CanvasInstance.HistoryManager().add(CanvasInstance_2.CanvasInstance.Context().getImageData(0, 0, CanvasInstance_2.CanvasInstance.Canvas().width, CanvasInstance_2.CanvasInstance.Canvas().height));
                };
                RectangleTool.prototype.mouseMoveEventHandler = function (e) {
                    var x = e.clientX - CanvasInstance_2.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_2.CanvasInstance.Canvas().offsetTop;
                    this.mouseUpPoint = new Point_4.Point(x, y);
                    if (this.dragInProgress) {
                        CanvasInstance_2.CanvasInstance.Context().putImageData(CanvasInstance_2.CanvasInstance.HistoryManager().getCurrentState(), 0, 0);
                        this.draw();
                    }
                };
                RectangleTool.prototype.keyDownEventHandler = function (e) {
                    // do nothing
                };
                RectangleTool.prototype.draw = function () {
                    var rectangle = new Rectangle_1.Rectangle(this.mouseDownPoint, this.mouseUpPoint);
                    rectangle.draw();
                };
                return RectangleTool;
            }());
            exports_7("RectangleTool", RectangleTool);
        }
    };
});
System.register("models/MorphingPolygon", ["Point", "models/Line"], function (exports_8, context_8) {
    "use strict";
    var Point_5, Line_2, MorphingPolygon;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (Point_5_1) {
                Point_5 = Point_5_1;
            },
            function (Line_2_1) {
                Line_2 = Line_2_1;
            }
        ],
        execute: function () {
            MorphingPolygon = /** @class */ (function () {
                /**
                 *  Creates a rectangle from two points.
                 */
                function MorphingPolygon(point1, point2) {
                    if (point1 === void 0) { point1 = new Point_5.Point(0, 0); }
                    if (point2 === void 0) { point2 = new Point_5.Point(0, 0); }
                    // point 1 is topleft and point 2 is bottom right
                    if (point1.x < point2.x && point1.y < point2.y) {
                        this.topLeft = point1;
                        this.bottomRight = point2;
                        this.bottomLeft = new Point_5.Point(this.topLeft.x, this.bottomRight.y);
                        this.topRight = new Point_5.Point(this.bottomRight.x, this.topLeft.y);
                    }
                    // point 1 is bottom left and point 2 top right
                    if (point1.x < point2.x && point1.y > point2.y) {
                        this.bottomLeft = point1;
                        this.topRight = point2;
                        this.topLeft = new Point_5.Point(this.bottomLeft.x, this.topRight.y);
                        this.bottomRight = new Point_5.Point(this.bottomLeft.y, this.topRight.x);
                    }
                    // point 1 is top right and point 2 is bottom left
                    if (point1.x > point2.x && point1.y < point2.y) {
                        this.topRight = point1;
                        this.bottomLeft = point2;
                        this.topLeft = new Point_5.Point(this.bottomLeft.x, this.topRight.y);
                        this.bottomRight = new Point_5.Point(this.bottomLeft.y, this.topRight.x);
                    }
                    // point 1 is bottom right and point 2 is top left
                    if (point1.x > point2.x && point1.y > point2.y) {
                        this.bottomRight = point1;
                        this.topLeft = point2;
                        this.bottomLeft = new Point_5.Point(this.topLeft.x, this.bottomRight.y);
                        this.topRight = new Point_5.Point(this.bottomRight.x, this.topLeft.y);
                    }
                }
                MorphingPolygon.prototype.draw = function () {
                    var left = new Line_2.Line(this.topLeft, this.bottomLeft);
                    var top = new Line_2.Line(this.topLeft, this.topRight);
                    var bottom = new Line_2.Line(this.bottomLeft, this.bottomRight);
                    var right = new Line_2.Line(this.bottomRight, this.topRight);
                    left.draw();
                    top.draw();
                    bottom.draw();
                    right.draw();
                };
                return MorphingPolygon;
            }());
            exports_8("MorphingPolygon", MorphingPolygon);
        }
    };
});
System.register("tools/MorphingPolygonTool", ["Point", "CanvasInstance", "models/MorphingPolygon"], function (exports_9, context_9) {
    "use strict";
    var Point_6, CanvasInstance_3, MorphingPolygon_1, MorphingPolygonTool;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (Point_6_1) {
                Point_6 = Point_6_1;
            },
            function (CanvasInstance_3_1) {
                CanvasInstance_3 = CanvasInstance_3_1;
            },
            function (MorphingPolygon_1_1) {
                MorphingPolygon_1 = MorphingPolygon_1_1;
            }
        ],
        execute: function () {
            MorphingPolygonTool = /** @class */ (function () {
                /**
                 *  Creates a rectangle from two points.
                 */
                function MorphingPolygonTool() {
                }
                MorphingPolygonTool.prototype.keyDownEventHandler = function (e) {
                    // do nothing
                };
                MorphingPolygonTool.prototype.mouseDownEventHandler = function (e) {
                    this.dragInProgress = true;
                    var x = e.clientX - CanvasInstance_3.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_3.CanvasInstance.Canvas().offsetTop;
                    this.mouseDownPoint = new Point_6.Point(x, y);
                };
                MorphingPolygonTool.prototype.mouseUpEventHandler = function (e) {
                    this.dragInProgress = false;
                    var x = e.clientX - CanvasInstance_3.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_3.CanvasInstance.Canvas().offsetTop;
                    this.mouseUpPoint = new Point_6.Point(x, y);
                    this.draw();
                    CanvasInstance_3.CanvasInstance.HistoryManager().add(CanvasInstance_3.CanvasInstance.Context().getImageData(0, 0, CanvasInstance_3.CanvasInstance.Canvas().width, CanvasInstance_3.CanvasInstance.Canvas().height));
                };
                MorphingPolygonTool.prototype.mouseMoveEventHandler = function (e) {
                    var x = e.clientX - CanvasInstance_3.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_3.CanvasInstance.Canvas().offsetTop;
                    this.mouseUpPoint = new Point_6.Point(x, y);
                    if (this.dragInProgress) {
                        CanvasInstance_3.CanvasInstance.Context().putImageData(CanvasInstance_3.CanvasInstance.HistoryManager().getCurrentState(), 0, 0);
                        this.draw();
                    }
                };
                MorphingPolygonTool.prototype.draw = function () {
                    var rectangle = new MorphingPolygon_1.MorphingPolygon(this.mouseDownPoint, this.mouseUpPoint);
                    rectangle.draw();
                };
                return MorphingPolygonTool;
            }());
            exports_9("MorphingPolygonTool", MorphingPolygonTool);
        }
    };
});
System.register("tools/LineTool", ["Point", "CanvasInstance", "models/Line"], function (exports_10, context_10) {
    "use strict";
    var Point_7, CanvasInstance_4, Line_3, LineTool;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (Point_7_1) {
                Point_7 = Point_7_1;
            },
            function (CanvasInstance_4_1) {
                CanvasInstance_4 = CanvasInstance_4_1;
            },
            function (Line_3_1) {
                Line_3 = Line_3_1;
            }
        ],
        execute: function () {
            LineTool = /** @class */ (function () {
                /**
                 *
                 */
                function LineTool(point1, point2) {
                    if (point1 === void 0) { point1 = new Point_7.Point(); }
                    if (point2 === void 0) { point2 = new Point_7.Point(); }
                    this.fromPoint = point1;
                    this.toPoint = point2;
                }
                LineTool.prototype.mouseDownEventHandler = function (e) {
                    this.dragInProgress = true;
                    var x = e.clientX - CanvasInstance_4.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_4.CanvasInstance.Canvas().offsetTop;
                    this.fromPoint = new Point_7.Point(x, y);
                };
                LineTool.prototype.mouseUpEventHandler = function (e) {
                    this.dragInProgress = false;
                    var x = e.clientX - CanvasInstance_4.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_4.CanvasInstance.Canvas().offsetTop;
                    this.toPoint = new Point_7.Point(x, y);
                    CanvasInstance_4.CanvasInstance.HistoryManager().add(CanvasInstance_4.CanvasInstance.Context().getImageData(0, 0, CanvasInstance_4.CanvasInstance.Canvas().width, CanvasInstance_4.CanvasInstance.Canvas().height));
                };
                LineTool.prototype.mouseMoveEventHandler = function (e) {
                    var x = e.clientX - CanvasInstance_4.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_4.CanvasInstance.Canvas().offsetTop;
                    this.toPoint = new Point_7.Point(x, y);
                    if (this.dragInProgress) {
                        CanvasInstance_4.CanvasInstance.Context().putImageData(CanvasInstance_4.CanvasInstance.HistoryManager().getCurrentState(), 0, 0);
                        this.draw();
                    }
                };
                LineTool.prototype.keyDownEventHandler = function (e) {
                    // do nothing
                };
                LineTool.prototype.draw = function () {
                    if (this.fromPoint == undefined || this.toPoint == undefined)
                        return;
                    var line = new Line_3.Line(this.fromPoint, this.toPoint);
                    line.draw();
                };
                return LineTool;
            }());
            exports_10("LineTool", LineTool);
        }
    };
});
System.register("tools/TextTool", ["CanvasInstance", "Point"], function (exports_11, context_11) {
    "use strict";
    var CanvasInstance_5, Point_8, TextTool;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (CanvasInstance_5_1) {
                CanvasInstance_5 = CanvasInstance_5_1;
            },
            function (Point_8_1) {
                Point_8 = Point_8_1;
            }
        ],
        execute: function () {
            TextTool = /** @class */ (function () {
                /**
                 *
                 */
                function TextTool() {
                    this.typingString = "";
                }
                TextTool.prototype.mouseDownEventHandler = function (e) {
                    var x = e.clientX - CanvasInstance_5.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_5.CanvasInstance.Canvas().offsetTop;
                    this.mouseDownPoint = new Point_8.Point(x, y);
                    this.typingInProgress = true;
                };
                TextTool.prototype.mouseUpEventHandler = function (e) {
                    var x = e.clientX - CanvasInstance_5.CanvasInstance.Canvas().offsetLeft;
                    var y = e.clientY - CanvasInstance_5.CanvasInstance.Canvas().offsetTop;
                    this.mouseUpPoint = new Point_8.Point(x, y);
                };
                TextTool.prototype.mouseMoveEventHandler = function (e) {
                    // do nothing
                };
                TextTool.prototype.keyDownEventHandler = function (e) {
                    // enter key
                    if (e.keyCode == 13) {
                        // end typing event if in progress
                        if (this.typingInProgress) {
                            this.typingInProgress = false;
                            this.typingString = "";
                            // save canvas state
                            CanvasInstance_5.CanvasInstance.HistoryManager().add(CanvasInstance_5.CanvasInstance.Context().getImageData(0, 0, CanvasInstance_5.CanvasInstance.Canvas().width, CanvasInstance_5.CanvasInstance.Canvas().height));
                        }
                    }
                    // draw typing
                    if (this.typingInProgress) {
                        CanvasInstance_5.CanvasInstance.Context().putImageData(CanvasInstance_5.CanvasInstance.HistoryManager().getCurrentState(), 0, 0);
                        this.typingString += e.key;
                        CanvasInstance_5.CanvasInstance.Context().font = "30px Ariel";
                        CanvasInstance_5.CanvasInstance.Context().fillText(this.typingString, this.mouseDownPoint.x, this.mouseDownPoint.y);
                    }
                };
                TextTool.prototype.draw = function () {
                    // todo:
                };
                return TextTool;
            }());
            exports_11("TextTool", TextTool);
        }
    };
});
System.register("PrototypeCanvas", ["tools/RectangleTool", "tools/MorphingPolygonTool", "CanvasHistory", "tools/LineTool", "CanvasInstance", "tools/TextTool"], function (exports_12, context_12) {
    "use strict";
    var RectangleTool_1, MorphingPolygonTool_1, CanvasHistory_1, LineTool_1, CanvasInstance_6, TextTool_1, PrototypeCanvas;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (RectangleTool_1_1) {
                RectangleTool_1 = RectangleTool_1_1;
            },
            function (MorphingPolygonTool_1_1) {
                MorphingPolygonTool_1 = MorphingPolygonTool_1_1;
            },
            function (CanvasHistory_1_1) {
                CanvasHistory_1 = CanvasHistory_1_1;
            },
            function (LineTool_1_1) {
                LineTool_1 = LineTool_1_1;
            },
            function (CanvasInstance_6_1) {
                CanvasInstance_6 = CanvasInstance_6_1;
            },
            function (TextTool_1_1) {
                TextTool_1 = TextTool_1_1;
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
                     * Event handler for morphing rectangle option click event.
                     */
                    this.morphingRectangleToolClickEventHandler = function (e) {
                        _this.currentTool = new MorphingPolygonTool_1.MorphingPolygonTool();
                    };
                    /**
                     * Event handler for rectangle tool option click event.
                     */
                    this.rectangleToolClickEventHandler = function (e) {
                        _this.currentTool = new RectangleTool_1.RectangleTool();
                    };
                    /**
                     * Event handler for text tool option click event.
                     */
                    this.textToolClickEventHandler = function (e) {
                        _this.currentTool = new TextTool_1.TextTool();
                    };
                    /**
                     * Event handler for line tool option click event.
                     */
                    this.lineToolOptionClickEventHandler = function (e) {
                        _this.currentTool = new LineTool_1.LineTool();
                    };
                    /**
                     * Event handler for the key down event.  Manages keyboard shortcuts
                     */
                    this.keyboardDownEventHandler = function (e) {
                        // undo keyboard shortcut
                        if (e.keyCode == 90 && e.ctrlKey)
                            _this.canvasHistory.undo();
                        // redo keyboard shortcut
                        if (e.keyCode == 89 && e.ctrlKey)
                            _this.canvasHistory.redo();
                        _this.currentTool.keyDownEventHandler(e);
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
                        _this.currentTool.mouseDownEventHandler(e);
                    };
                    /**
                     * Event handler for canvas mouse move event.
                     */
                    this.mouseMoveEventHandler = function (e) {
                        var x = e.clientX - _this.canvas.offsetLeft;
                        var y = e.clientY - _this.canvas.offsetTop;
                        _this.infoDisplay.innerText = "X: " + x + " Y: " + y;
                        _this.currentTool.mouseMoveEventHandler(e);
                    };
                    /**
                     * Event handler for canvas mouse up event.
                     */
                    this.mouseUpEventHandler = function (e) {
                        _this.currentTool.mouseUpEventHandler(e);
                    };
                    console.log("hello");
                    this.canvas = document.getElementById('TheCanvas');
                    this.infoDisplay = document.getElementById('InfoDisplay');
                    this.context = this.canvas.getContext("2d");
                    this.canvas.width = this.canvas.offsetWidth;
                    this.canvas.height = this.canvas.offsetHeight;
                    this.canvasHistory = new CanvasHistory_1.CanvasHistoryManager(this.context);
                    this.canvasHistory.add(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
                    this.currentTool = new MorphingPolygonTool_1.MorphingPolygonTool();
                    CanvasInstance_6.CanvasInstance.SetCurrentCanvas(this.canvas);
                    CanvasInstance_6.CanvasInstance.SetCurrentContext(this.context);
                    CanvasInstance_6.CanvasInstance.SetHistoryManager(this.canvasHistory);
                    this.canvas.addEventListener("mousedown", this.mouseDownEventHandler);
                    this.canvas.addEventListener("mouseup", this.mouseUpEventHandler);
                    this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler);
                    this.canvas.addEventListener("resize", this.canvasOnResizeEventHandler);
                    document.addEventListener("keydown", this.keyboardDownEventHandler);
                    // edit buttons
                    this.undoButton = document.getElementById("UndoButton");
                    this.redoButton = document.getElementById("RedoButton");
                    this.saveButton = document.getElementById("SaveButton");
                    // drawing tools
                    this.textToolOption = document.getElementById("TextToolOption");
                    this.lineToolOption = document.getElementById("LineToolOption");
                    this.rectangleToolOption = document.getElementById("RectangleToolOption");
                    this.morphingPolygonToolOption = document.getElementById("MorphingPolygonToolOption");
                    // button event handlers
                    this.undoButton.addEventListener("click", this.undoButtonClickEventHandler);
                    this.redoButton.addEventListener("click", this.redoButtonClickEventHandler);
                    this.saveButton.addEventListener("click", this.saveButtonClickEventHandler);
                    this.textToolOption.addEventListener("click", this.textToolClickEventHandler);
                    this.lineToolOption.addEventListener("click", this.lineToolOptionClickEventHandler);
                    this.rectangleToolOption.addEventListener("click", this.rectangleToolClickEventHandler);
                    this.morphingPolygonToolOption.addEventListener("click", this.morphingRectangleToolClickEventHandler);
                }
                /**
                 * Event handler for when the canvas is resized.
                 */
                PrototypeCanvas.prototype.canvasOnResizeEventHandler = function () {
                    this.canvas.width = this.canvas.offsetWidth;
                    this.canvas.height = this.canvas.offsetHeight;
                };
                ;
                return PrototypeCanvas;
            }());
            exports_12("PrototypeCanvas", PrototypeCanvas);
        }
    };
});
System.register("main", ["PrototypeCanvas", "DraggableElement"], function (exports_13, context_13) {
    "use strict";
    var ProtoTypeCanvas_1, DraggableElement_1, prototypeCanvas, draggableElements, i, element, draggable;
    var __moduleName = context_13 && context_13.id;
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