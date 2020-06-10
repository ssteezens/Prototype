var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
System.register("dependencies/webstomp/i-transaction", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("dependencies/webstomp/stomp-headers", [], function (exports_13, context_13) {
    "use strict";
    var StompHeaders;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [],
        execute: function () {
            /**
             * STOMP headers. Many functions calls will accept headers as parameters.
             * The headers sent by Broker will be available as [IFrame#headers]{@link IFrame#headers}.
             *
             * `key` and `value` must be valid strings.
             * In addition, `key` must not contain `CR`, `LF`, or `:`.
             *
             * Part of `@stomp/stompjs`.
             */
            StompHeaders = /** @class */ (function () {
                function StompHeaders() {
                }
                return StompHeaders;
            }());
            exports_13("StompHeaders", StompHeaders);
        }
    };
});
System.register("dependencies/webstomp/i-frame", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("dependencies/webstomp/i-message", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("dependencies/webstomp/types", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("dependencies/webstomp/versions", [], function (exports_17, context_17) {
    "use strict";
    var Versions;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
            Versions = /** @class */ (function () {
                /**
                 * Takes an array of string of versions, typical elements '1.0', '1.1', or '1.2'
                 *
                 * You will an instance if this class if you want to override supported versions to be declared during
                 * STOMP handshake.
                 */
                function Versions(versions) {
                    this.versions = versions;
                }
                /**
                 * Used as part of CONNECT STOMP Frame
                 */
                Versions.prototype.supportedVersions = function () {
                    return this.versions.join(',');
                };
                /**
                 * Used while creating a WebSocket
                 */
                Versions.prototype.protocolVersions = function () {
                    return this.versions.map(function (x) { return "v" + x.replace('.', '') + ".stomp"; });
                };
                /**
                 * Indicates protocol version 1.0
                 */
                Versions.V1_0 = '1.0';
                /**
                 * Indicates protocol version 1.1
                 */
                Versions.V1_1 = '1.1';
                /**
                 * Indicates protocol version 1.2
                 */
                Versions.V1_2 = '1.2';
                /**
                 * @internal
                 */
                Versions.default = new Versions([Versions.V1_0, Versions.V1_1, Versions.V1_2]);
                return Versions;
            }());
            exports_17("Versions", Versions);
        }
    };
});
System.register("dependencies/webstomp/stomp-config", [], function (exports_18, context_18) {
    "use strict";
    var StompConfig;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
            /**
             * Configuration options for STOMP Client, each key corresponds to
             * field by the same name in {@link Client}. This can be passed to
             * the constructor of {@link Client} or to [Client#configure]{@link Client#configure}.
             *
             * Part of `@stomp/stompjs`.
             */
            StompConfig = /** @class */ (function () {
                function StompConfig() {
                }
                return StompConfig;
            }());
            exports_18("StompConfig", StompConfig);
        }
    };
});
System.register("dependencies/webstomp/byte", [], function (exports_19, context_19) {
    "use strict";
    var BYTE;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [],
        execute: function () {
            /**
             * Some byte values, used as per STOMP specifications.
             *
             * Part of `@stomp/stompjs`.
             *
             * @internal
             */
            exports_19("BYTE", BYTE = {
                // LINEFEED byte (octet 10)
                LF: '\x0A',
                // NULL byte (octet 0)
                NULL: '\x00'
            });
        }
    };
});
System.register("dependencies/webstomp/frame-impl", ["dependencies/webstomp/byte"], function (exports_20, context_20) {
    "use strict";
    var byte_1, FrameImpl;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [
            function (byte_1_1) {
                byte_1 = byte_1_1;
            }
        ],
        execute: function () {
            /**
             * Frame class represents a STOMP frame.
             *
             * @internal
             */
            FrameImpl = /** @class */ (function () {
                /**
                 * Frame constructor. `command`, `headers` and `body` are available as properties.
                 *
                 * @internal
                 */
                function FrameImpl(params) {
                    var command = params.command, headers = params.headers, body = params.body, binaryBody = params.binaryBody, escapeHeaderValues = params.escapeHeaderValues, skipContentLengthHeader = params.skipContentLengthHeader;
                    this.command = command;
                    this.headers = Object.assign({}, headers || {});
                    if (binaryBody) {
                        this._binaryBody = binaryBody;
                        this.isBinaryBody = true;
                    }
                    else {
                        this._body = body || '';
                        this.isBinaryBody = false;
                    }
                    this.escapeHeaderValues = escapeHeaderValues || false;
                    this.skipContentLengthHeader = skipContentLengthHeader || false;
                }
                Object.defineProperty(FrameImpl.prototype, "body", {
                    /**
                     * body of the frame
                     */
                    get: function () {
                        if (!this._body && this.isBinaryBody) {
                            this._body = new TextDecoder().decode(this._binaryBody);
                        }
                        return this._body;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FrameImpl.prototype, "binaryBody", {
                    /**
                     * body as Uint8Array
                     */
                    get: function () {
                        if (!this._binaryBody && !this.isBinaryBody) {
                            this._binaryBody = new TextEncoder().encode(this._body);
                        }
                        return this._binaryBody;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * deserialize a STOMP Frame from raw data.
                 *
                 * @internal
                 */
                FrameImpl.fromRawFrame = function (rawFrame, escapeHeaderValues) {
                    var headers = {};
                    var trim = function (str) { return str.replace(/^\s+|\s+$/g, ''); };
                    // In case of repeated headers, as per standards, first value need to be used
                    for (var _i = 0, _a = rawFrame.headers.reverse(); _i < _a.length; _i++) {
                        var header = _a[_i];
                        var idx = header.indexOf(':');
                        var key = trim(header[0]);
                        var value = trim(header[1]);
                        if (escapeHeaderValues && (rawFrame.command !== 'CONNECT') && (rawFrame.command !== 'CONNECTED')) {
                            value = FrameImpl.hdrValueUnEscape(value);
                        }
                        headers[key] = value;
                    }
                    return new FrameImpl({
                        command: rawFrame.command,
                        headers: headers,
                        binaryBody: rawFrame.binaryBody,
                        escapeHeaderValues: escapeHeaderValues
                    });
                };
                /**
                 * @internal
                 */
                FrameImpl.prototype.toString = function () {
                    return this.serializeCmdAndHeaders();
                };
                /**
                 * serialize this Frame in a format suitable to be passed to WebSocket.
                 * If the body is string the output will be string.
                 * If the body is binary (i.e. of type Unit8Array) it will be serialized to ArrayBuffer.
                 *
                 * @internal
                 */
                FrameImpl.prototype.serialize = function () {
                    var cmdAndHeaders = this.serializeCmdAndHeaders();
                    if (this.isBinaryBody) {
                        return FrameImpl.toUnit8Array(cmdAndHeaders, this._binaryBody).buffer;
                    }
                    else {
                        return cmdAndHeaders + this._body + byte_1.BYTE.NULL;
                    }
                };
                FrameImpl.prototype.serializeCmdAndHeaders = function () {
                    var lines = [this.command];
                    if (this.skipContentLengthHeader) {
                        delete this.headers['content-length'];
                    }
                    for (var _i = 0, _a = Object.keys(this.headers || {}); _i < _a.length; _i++) {
                        var name_1 = _a[_i];
                        var value = this.headers[name_1];
                        if (this.escapeHeaderValues && (this.command !== 'CONNECT') && (this.command !== 'CONNECTED')) {
                            lines.push(name_1 + ":" + FrameImpl.hdrValueEscape("" + value));
                        }
                        else {
                            lines.push(name_1 + ":" + value);
                        }
                    }
                    if (this.isBinaryBody || (!this.isBodyEmpty() && !this.skipContentLengthHeader)) {
                        lines.push("content-length:" + this.bodyLength());
                    }
                    return lines.join(byte_1.BYTE.LF) + byte_1.BYTE.LF + byte_1.BYTE.LF;
                };
                FrameImpl.prototype.isBodyEmpty = function () {
                    return this.bodyLength() === 0;
                };
                FrameImpl.prototype.bodyLength = function () {
                    var binaryBody = this.binaryBody;
                    return binaryBody ? binaryBody.length : 0;
                };
                /**
                 * Compute the size of a UTF-8 string by counting its number of bytes
                 * (and not the number of characters composing the string)
                 */
                FrameImpl.sizeOfUTF8 = function (s) {
                    return s ? new TextEncoder().encode(s).length : 0;
                };
                FrameImpl.toUnit8Array = function (cmdAndHeaders, binaryBody) {
                    var uint8CmdAndHeaders = new TextEncoder().encode(cmdAndHeaders);
                    var nullTerminator = new Uint8Array([0]);
                    var uint8Frame = new Uint8Array(uint8CmdAndHeaders.length + binaryBody.length + nullTerminator.length);
                    uint8Frame.set(uint8CmdAndHeaders);
                    uint8Frame.set(binaryBody, uint8CmdAndHeaders.length);
                    uint8Frame.set(nullTerminator, uint8CmdAndHeaders.length + binaryBody.length);
                    return uint8Frame;
                };
                /**
                 * Serialize a STOMP frame as per STOMP standards, suitable to be sent to the STOMP broker.
                 *
                 * @internal
                 */
                FrameImpl.marshall = function (params) {
                    var frame = new FrameImpl(params);
                    return frame.serialize();
                };
                /**
                 *  Escape header values
                 */
                FrameImpl.hdrValueEscape = function (str) {
                    return str.replace(/\\/g, '\\\\').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/:/g, '\\c');
                };
                /**
                 * UnEscape header values
                 */
                FrameImpl.hdrValueUnEscape = function (str) {
                    return str.replace(/\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\c/g, ':').replace(/\\\\/g, '\\');
                };
                return FrameImpl;
            }());
            exports_20("FrameImpl", FrameImpl);
        }
    };
});
System.register("dependencies/webstomp/parser", [], function (exports_21, context_21) {
    "use strict";
    var NULL, LF, CR, COLON, Parser;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [],
        execute: function () {
            /**
             * @internal
             */
            NULL = 0;
            /**
             * @internal
             */
            LF = 10;
            /**
             * @internal
             */
            CR = 13;
            /**
             * @internal
             */
            COLON = 58;
            /**
             * This is an evented, rec descent parser.
             * A stream of Octets can be passed and whenever it recognizes
             * a complete Frame or an incoming ping it will invoke the registered callbacks.
             *
             * All incoming Octets are fed into _onByte function.
             * Depending on current state the _onByte function keeps changing.
             * Depending on the state it keeps accumulating into _token and _results.
             * State is indicated by current value of _onByte, all states are named as _collect.
             *
             * STOMP standards https://stomp.github.io/stomp-specification-1.2.html
             * imply that all lengths are considered in bytes (instead of string lengths).
             * So, before actual parsing, if the incoming data is String it is converted to Octets.
             * This allows faithful implementation of the protocol and allows NULL Octets to be present in the body.
             *
             * There is no peek function on the incoming data.
             * When a state change occurs based on an Octet without consuming the Octet,
             * the Octet, after state change, is fed again (_reinjectByte).
             * This became possible as the state change can be determined by inspecting just one Octet.
             *
             * There are two modes to collect the body, if content-length header is there then it by counting Octets
             * otherwise it is determined by NULL terminator.
             *
             * Following the standards, the command and headers are converted to Strings
             * and the body is returned as Octets.
             * Headers are returned as an array and not as Hash - to allow multiple occurrence of an header.
             *
             * This parser does not use Regular Expressions as that can only operate on Strings.
             *
             * It handles if multiple STOMP frames are given as one chunk, a frame is split into multiple chunks, or
             * any combination there of. The parser remembers its state (any partial frame) and continues when a new chunk
             * is pushed.
             *
             * Typically the higher level function will convert headers to Hash, handle unescaping of header values
             * (which is protocol version specific), and convert body to text.
             *
             * Check the parser.spec.js to understand cases that this parser is supposed to handle.
             *
             * Part of `@stomp/stompjs`.
             *
             * @internal
             */
            Parser = /** @class */ (function () {
                function Parser(onFrame, onIncomingPing) {
                    this.onFrame = onFrame;
                    this.onIncomingPing = onIncomingPing;
                    this._encoder = new TextEncoder();
                    this._decoder = new TextDecoder();
                    this._token = [];
                    this._initState();
                }
                Parser.prototype.parseChunk = function (segment, appendMissingNULLonIncoming) {
                    if (appendMissingNULLonIncoming === void 0) { appendMissingNULLonIncoming = false; }
                    var chunk;
                    if ((segment instanceof ArrayBuffer)) {
                        chunk = new Uint8Array(segment);
                    }
                    else {
                        chunk = this._encoder.encode(segment);
                    }
                    // See https://github.com/stomp-js/stompjs/issues/89
                    // Remove when underlying issue is fixed.
                    //
                    // Send a NULL byte, if the last byte of a Text frame was not NULL.F
                    if (appendMissingNULLonIncoming && chunk[chunk.length - 1] !== 0) {
                        var chunkWithNull = new Uint8Array(chunk.length + 1);
                        chunkWithNull.set(chunk, 0);
                        chunkWithNull[chunk.length] = 0;
                        chunk = chunkWithNull;
                    }
                    // tslint:disable-next-line:prefer-for-of
                    for (var i = 0; i < chunk.length; i++) {
                        var byte = chunk[i];
                        this._onByte(byte);
                    }
                };
                // The following implements a simple Rec Descent Parser.
                // The grammar is simple and just one byte tells what should be the next state
                Parser.prototype._collectFrame = function (byte) {
                    if (byte === NULL) { // Ignore
                        return;
                    }
                    if (byte === CR) { // Ignore CR
                        return;
                    }
                    if (byte === LF) { // Incoming Ping
                        this.onIncomingPing();
                        return;
                    }
                    this._onByte = this._collectCommand;
                    this._reinjectByte(byte);
                };
                Parser.prototype._collectCommand = function (byte) {
                    if (byte === CR) { // Ignore CR
                        return;
                    }
                    if (byte === LF) {
                        this._results.command = this._consumeTokenAsUTF8();
                        this._onByte = this._collectHeaders;
                        return;
                    }
                    this._consumeByte(byte);
                };
                Parser.prototype._collectHeaders = function (byte) {
                    if (byte === CR) { // Ignore CR
                        return;
                    }
                    if (byte === LF) {
                        this._setupCollectBody();
                        return;
                    }
                    this._onByte = this._collectHeaderKey;
                    this._reinjectByte(byte);
                };
                Parser.prototype._reinjectByte = function (byte) {
                    this._onByte(byte);
                };
                Parser.prototype._collectHeaderKey = function (byte) {
                    if (byte === COLON) {
                        this._headerKey = this._consumeTokenAsUTF8();
                        this._onByte = this._collectHeaderValue;
                        return;
                    }
                    this._consumeByte(byte);
                };
                Parser.prototype._collectHeaderValue = function (byte) {
                    if (byte === CR) { // Ignore CR
                        return;
                    }
                    if (byte === LF) {
                        this._results.headers.push([this._headerKey, this._consumeTokenAsUTF8()]);
                        this._headerKey = undefined;
                        this._onByte = this._collectHeaders;
                        return;
                    }
                    this._consumeByte(byte);
                };
                Parser.prototype._setupCollectBody = function () {
                    var contentLengthHeader = this._results.headers.filter(function (header) {
                        return header[0] === 'content-length';
                    })[0];
                    if (contentLengthHeader) {
                        this._bodyBytesRemaining = parseInt(contentLengthHeader[1], 10);
                        this._onByte = this._collectBodyFixedSize;
                    }
                    else {
                        this._onByte = this._collectBodyNullTerminated;
                    }
                };
                Parser.prototype._collectBodyNullTerminated = function (byte) {
                    if (byte === NULL) {
                        this._retrievedBody();
                        return;
                    }
                    this._consumeByte(byte);
                };
                Parser.prototype._collectBodyFixedSize = function (byte) {
                    // It is post decrement, so that we discard the trailing NULL octet
                    if (this._bodyBytesRemaining-- === 0) {
                        this._retrievedBody();
                        return;
                    }
                    this._consumeByte(byte);
                };
                Parser.prototype._retrievedBody = function () {
                    this._results.binaryBody = this._consumeTokenAsRaw();
                    this.onFrame(this._results);
                    this._initState();
                };
                // Rec Descent Parser helpers
                Parser.prototype._consumeByte = function (byte) {
                    this._token.push(byte);
                };
                Parser.prototype._consumeTokenAsUTF8 = function () {
                    return this._decoder.decode(this._consumeTokenAsRaw());
                };
                Parser.prototype._consumeTokenAsRaw = function () {
                    var rawResult = new Uint8Array(this._token);
                    this._token = [];
                    return rawResult;
                };
                Parser.prototype._initState = function () {
                    this._results = {
                        command: undefined,
                        headers: [],
                        binaryBody: undefined
                    };
                    this._token = [];
                    this._headerKey = undefined;
                    this._onByte = this._collectFrame;
                };
                return Parser;
            }());
            exports_21("Parser", Parser);
        }
    };
});
System.register("dependencies/webstomp/stomp-subscription", [], function (exports_22, context_22) {
    "use strict";
    var StompSubscription;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [],
        execute: function () {
            /**
             * Call [Client#subscribe]{@link Client#subscribe} to create a StompSubscription.
             *
             * Part of `@stomp/stompjs`.
             */
            StompSubscription = /** @class */ (function () {
                function StompSubscription() {
                }
                return StompSubscription;
            }());
            exports_22("StompSubscription", StompSubscription);
        }
    };
});
System.register("dependencies/webstomp/web-socket-state", [], function (exports_23, context_23) {
    "use strict";
    var WebSocketState;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [],
        execute: function () {
            /**
             * Possible states for the WebSocket, copied here to avoid dependency on WebSocket class
             *
             * Part of `@stomp/rx-stomp`
             *
             * @internal
             */
            (function (WebSocketState) {
                WebSocketState[WebSocketState["CONNECTING"] = 0] = "CONNECTING";
                WebSocketState[WebSocketState["OPEN"] = 1] = "OPEN";
                WebSocketState[WebSocketState["CLOSING"] = 2] = "CLOSING";
                WebSocketState[WebSocketState["CLOSED"] = 3] = "CLOSED";
            })(WebSocketState || (WebSocketState = {}));
            exports_23("WebSocketState", WebSocketState);
        }
    };
});
System.register("dependencies/webstomp/stomp-handler", ["dependencies/webstomp/byte", "dependencies/webstomp/frame-impl", "dependencies/webstomp/parser", "dependencies/webstomp/versions", "dependencies/webstomp/web-socket-state"], function (exports_24, context_24) {
    "use strict";
    var byte_2, frame_impl_1, parser_1, versions_1, web_socket_state_1, StompHandler;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (byte_2_1) {
                byte_2 = byte_2_1;
            },
            function (frame_impl_1_1) {
                frame_impl_1 = frame_impl_1_1;
            },
            function (parser_1_1) {
                parser_1 = parser_1_1;
            },
            function (versions_1_1) {
                versions_1 = versions_1_1;
            },
            function (web_socket_state_1_1) {
                web_socket_state_1 = web_socket_state_1_1;
            }
        ],
        execute: function () {
            /**
             * The STOMP protocol handler
             *
             * Part of `@stomp/stompjs`.
             *
             * @internal
             */
            StompHandler = /** @class */ (function () {
                function StompHandler(_client, _webSocket, config) {
                    var _this = this;
                    if (config === void 0) { config = {}; }
                    this._client = _client;
                    this._webSocket = _webSocket;
                    this._serverFrameHandlers = {
                        // [CONNECTED Frame](http://stomp.github.com/stomp-specification-1.2.html#CONNECTED_Frame)
                        CONNECTED: function (frame) {
                            _this.debug("connected to server " + frame.headers.server);
                            _this._connected = true;
                            _this._connectedVersion = frame.headers.version;
                            // STOMP version 1.2 needs header values to be escaped
                            if (_this._connectedVersion === versions_1.Versions.V1_2) {
                                _this._escapeHeaderValues = true;
                            }
                            _this._setupHeartbeat(frame.headers);
                            _this.onConnect(frame);
                        },
                        // [MESSAGE Frame](http://stomp.github.com/stomp-specification-1.2.html#MESSAGE)
                        MESSAGE: function (frame) {
                            // the callback is registered when the client calls
                            // `subscribe()`.
                            // If there is no registered subscription for the received message,
                            // the default `onUnhandledMessage` callback is used that the client can set.
                            // This is useful for subscriptions that are automatically created
                            // on the browser side (e.g. [RabbitMQ's temporary
                            // queues](http://www.rabbitmq.com/stomp.html)).
                            var subscription = frame.headers.subscription;
                            var onReceive = _this._subscriptions[subscription] || _this.onUnhandledMessage;
                            // bless the frame to be a Message
                            var message = frame;
                            var client = _this;
                            var messageId = _this._connectedVersion === versions_1.Versions.V1_2 ? message.headers.ack : message.headers['message-id'];
                            // add `ack()` and `nack()` methods directly to the returned frame
                            // so that a simple call to `message.ack()` can acknowledge the message.
                            message.ack = function (headers) {
                                if (headers === void 0) { headers = {}; }
                                return client.ack(messageId, subscription, headers);
                            };
                            message.nack = function (headers) {
                                if (headers === void 0) { headers = {}; }
                                return client.nack(messageId, subscription, headers);
                            };
                            onReceive(message);
                        },
                        // [RECEIPT Frame](http://stomp.github.com/stomp-specification-1.2.html#RECEIPT)
                        RECEIPT: function (frame) {
                            var callback = _this._receiptWatchers[frame.headers['receipt-id']];
                            if (callback) {
                                callback(frame);
                                // Server will acknowledge only once, remove the callback
                                delete _this._receiptWatchers[frame.headers['receipt-id']];
                            }
                            else {
                                _this.onUnhandledReceipt(frame);
                            }
                        },
                        // [ERROR Frame](http://stomp.github.com/stomp-specification-1.2.html#ERROR)
                        ERROR: function (frame) {
                            _this.onStompError(frame);
                        }
                    };
                    // used to index subscribers
                    this._counter = 0;
                    // subscription callbacks indexed by subscriber's ID
                    this._subscriptions = {};
                    // receipt-watchers indexed by receipts-ids
                    this._receiptWatchers = {};
                    this._partialData = '';
                    this._escapeHeaderValues = false;
                    this._lastServerActivityTS = Date.now();
                    this.configure(config);
                }
                Object.defineProperty(StompHandler.prototype, "connectedVersion", {
                    get: function () {
                        return this._connectedVersion;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StompHandler.prototype, "connected", {
                    get: function () {
                        return this._connected;
                    },
                    enumerable: true,
                    configurable: true
                });
                StompHandler.prototype.configure = function (conf) {
                    // bulk assign all properties to this
                    Object.assign(this, conf);
                };
                StompHandler.prototype.start = function () {
                    var _this = this;
                    var parser = new parser_1.Parser(
                    // On Frame
                    function (rawFrame) {
                        var frame = frame_impl_1.FrameImpl.fromRawFrame(rawFrame, _this._escapeHeaderValues);
                        // if this.logRawCommunication is set, the rawChunk is logged at this._webSocket.onmessage
                        if (!_this.logRawCommunication) {
                            _this.debug("<<< " + frame);
                        }
                        var serverFrameHandler = _this._serverFrameHandlers[frame.command] || _this.onUnhandledFrame;
                        serverFrameHandler(frame);
                    }, 
                    // On Incoming Ping
                    function () {
                        _this.debug('<<< PONG');
                    });
                    this._webSocket.onmessage = function (evt) {
                        _this.debug('Received data');
                        _this._lastServerActivityTS = Date.now();
                        if (_this.logRawCommunication) {
                            var rawChunkAsString = (evt.data instanceof ArrayBuffer) ? new TextDecoder().decode(evt.data) : evt.data;
                            _this.debug("<<< " + rawChunkAsString);
                        }
                        parser.parseChunk(evt.data, _this.appendMissingNULLonIncoming);
                    };
                    this._webSocket.onclose = function (closeEvent) {
                        _this.debug("Connection closed to " + _this._webSocket.url);
                        _this.onWebSocketClose(closeEvent);
                        _this._cleanUp();
                    };
                    this._webSocket.onerror = function (errorEvent) {
                        _this.onWebSocketError(errorEvent);
                    };
                    this._webSocket.onopen = function () {
                        // Clone before updating
                        var connectHeaders = Object.assign({}, _this.connectHeaders);
                        _this.debug('Web Socket Opened...');
                        connectHeaders['accept-version'] = _this.stompVersions.supportedVersions();
                        connectHeaders['heart-beat'] = [_this.heartbeatOutgoing, _this.heartbeatIncoming].join(',');
                        _this._transmit({ command: 'CONNECT', headers: connectHeaders });
                    };
                };
                StompHandler.prototype._setupHeartbeat = function (headers) {
                    var _this = this;
                    if ((headers.version !== versions_1.Versions.V1_1 && headers.version !== versions_1.Versions.V1_2)) {
                        return;
                    }
                    // It is valid for the server to not send this header
                    // https://stomp.github.io/stomp-specification-1.2.html#Heart-beating
                    if (!headers['heart-beat']) {
                        return;
                    }
                    // heart-beat header received from the server looks like:
                    //
                    //     heart-beat: sx, sy
                    var _a = (headers['heart-beat']).split(',').map(function (v) { return parseInt(v, 10); }), serverOutgoing = _a[0], serverIncoming = _a[1];
                    if ((this.heartbeatOutgoing !== 0) && (serverIncoming !== 0)) {
                        var ttl = Math.max(this.heartbeatOutgoing, serverIncoming);
                        this.debug("send PING every " + ttl + "ms");
                        this._pinger = setInterval(function () {
                            if (_this._webSocket.readyState === web_socket_state_1.WebSocketState.OPEN) {
                                _this._webSocket.send(byte_2.BYTE.LF);
                                _this.debug('>>> PING');
                            }
                        }, ttl);
                    }
                    if ((this.heartbeatIncoming !== 0) && (serverOutgoing !== 0)) {
                        var ttl_1 = Math.max(this.heartbeatIncoming, serverOutgoing);
                        this.debug("check PONG every " + ttl_1 + "ms");
                        this._ponger = setInterval(function () {
                            var delta = Date.now() - _this._lastServerActivityTS;
                            // We wait twice the TTL to be flexible on window's setInterval calls
                            if (delta > (ttl_1 * 2)) {
                                _this.debug("did not receive server activity for the last " + delta + "ms");
                                _this._closeWebsocket();
                            }
                        }, ttl_1);
                    }
                };
                StompHandler.prototype._closeWebsocket = function () {
                    this._webSocket.onmessage = function () { }; // ignore messages
                    this._webSocket.close();
                };
                StompHandler.prototype._transmit = function (params) {
                    var command = params.command, headers = params.headers, body = params.body, binaryBody = params.binaryBody, skipContentLengthHeader = params.skipContentLengthHeader;
                    var frame = new frame_impl_1.FrameImpl({
                        command: command,
                        headers: headers,
                        body: body,
                        binaryBody: binaryBody,
                        escapeHeaderValues: this._escapeHeaderValues,
                        skipContentLengthHeader: skipContentLengthHeader
                    });
                    var rawChunk = frame.serialize();
                    if (this.logRawCommunication) {
                        this.debug(">>> " + rawChunk);
                    }
                    else {
                        this.debug(">>> " + frame);
                    }
                    if (this.forceBinaryWSFrames && typeof rawChunk === 'string') {
                        rawChunk = new TextEncoder().encode(rawChunk);
                    }
                    if (typeof rawChunk !== 'string' || !this.splitLargeFrames) {
                        this._webSocket.send(rawChunk);
                    }
                    else {
                        var out = rawChunk;
                        while (out.length > 0) {
                            var chunk = out.substring(0, this.maxWebSocketChunkSize);
                            out = out.substring(this.maxWebSocketChunkSize);
                            this._webSocket.send(chunk);
                            this.debug("chunk sent = " + chunk.length + ", remaining = " + out.length);
                        }
                    }
                };
                StompHandler.prototype.dispose = function () {
                    var _this = this;
                    if (this.connected) {
                        try {
                            // clone before updating
                            var disconnectHeaders = Object.assign({}, this.disconnectHeaders);
                            if (!disconnectHeaders.receipt) {
                                disconnectHeaders.receipt = "close-" + this._counter++;
                            }
                            this.watchForReceipt(disconnectHeaders.receipt, function (frame) {
                                _this._closeWebsocket();
                                _this._cleanUp();
                                _this.onDisconnect(frame);
                            });
                            this._transmit({ command: 'DISCONNECT', headers: disconnectHeaders });
                        }
                        catch (error) {
                            this.debug("Ignoring error during disconnect " + error);
                        }
                    }
                    else {
                        if (this._webSocket.readyState === web_socket_state_1.WebSocketState.CONNECTING
                            || this._webSocket.readyState === web_socket_state_1.WebSocketState.OPEN) {
                            this._closeWebsocket();
                        }
                    }
                };
                StompHandler.prototype._cleanUp = function () {
                    this._connected = false;
                    if (this._pinger) {
                        clearInterval(this._pinger);
                    }
                    if (this._ponger) {
                        clearInterval(this._ponger);
                    }
                };
                StompHandler.prototype.publish = function (params) {
                    var destination = params.destination, headers = params.headers, body = params.body, binaryBody = params.binaryBody, skipContentLengthHeader = params.skipContentLengthHeader;
                    var hdrs = Object.assign({ destination: destination }, headers);
                    this._transmit({
                        command: 'SEND',
                        headers: hdrs,
                        body: body,
                        binaryBody: binaryBody,
                        skipContentLengthHeader: skipContentLengthHeader
                    });
                };
                StompHandler.prototype.watchForReceipt = function (receiptId, callback) {
                    this._receiptWatchers[receiptId] = callback;
                };
                StompHandler.prototype.subscribe = function (destination, callback, headers) {
                    if (headers === void 0) { headers = {}; }
                    headers = Object.assign({}, headers);
                    if (!headers.id) {
                        headers.id = "sub-" + this._counter++;
                    }
                    headers.destination = destination;
                    this._subscriptions[headers.id] = callback;
                    this._transmit({ command: 'SUBSCRIBE', headers: headers });
                    var client = this;
                    return {
                        id: headers.id,
                        unsubscribe: function (hdrs) {
                            return client.unsubscribe(headers.id, hdrs);
                        }
                    };
                };
                StompHandler.prototype.unsubscribe = function (id, headers) {
                    if (headers === void 0) { headers = {}; }
                    headers = Object.assign({}, headers);
                    delete this._subscriptions[id];
                    headers.id = id;
                    this._transmit({ command: 'UNSUBSCRIBE', headers: headers });
                };
                StompHandler.prototype.begin = function (transactionId) {
                    var txId = transactionId || ("tx-" + this._counter++);
                    this._transmit({
                        command: 'BEGIN', headers: {
                            transaction: txId
                        }
                    });
                    var client = this;
                    return {
                        id: txId,
                        commit: function () {
                            client.commit(txId);
                        },
                        abort: function () {
                            client.abort(txId);
                        }
                    };
                };
                StompHandler.prototype.commit = function (transactionId) {
                    this._transmit({
                        command: 'COMMIT', headers: {
                            transaction: transactionId
                        }
                    });
                };
                StompHandler.prototype.abort = function (transactionId) {
                    this._transmit({
                        command: 'ABORT', headers: {
                            transaction: transactionId
                        }
                    });
                };
                StompHandler.prototype.ack = function (messageId, subscriptionId, headers) {
                    if (headers === void 0) { headers = {}; }
                    headers = Object.assign({}, headers);
                    if (this._connectedVersion === versions_1.Versions.V1_2) {
                        headers.id = messageId;
                    }
                    else {
                        headers['message-id'] = messageId;
                    }
                    headers.subscription = subscriptionId;
                    this._transmit({ command: 'ACK', headers: headers });
                };
                StompHandler.prototype.nack = function (messageId, subscriptionId, headers) {
                    if (headers === void 0) { headers = {}; }
                    headers = Object.assign({}, headers);
                    if (this._connectedVersion === versions_1.Versions.V1_2) {
                        headers.id = messageId;
                    }
                    else {
                        headers['message-id'] = messageId;
                    }
                    headers.subscription = subscriptionId;
                    return this._transmit({ command: 'NACK', headers: headers });
                };
                return StompHandler;
            }());
            exports_24("StompHandler", StompHandler);
        }
    };
});
System.register("dependencies/webstomp/client", ["dependencies/webstomp/stomp-handler", "dependencies/webstomp/versions", "dependencies/webstomp/web-socket-state"], function (exports_25, context_25) {
    "use strict";
    var stomp_handler_1, versions_2, web_socket_state_2, Client;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [
            function (stomp_handler_1_1) {
                stomp_handler_1 = stomp_handler_1_1;
            },
            function (versions_2_1) {
                versions_2 = versions_2_1;
            },
            function (web_socket_state_2_1) {
                web_socket_state_2 = web_socket_state_2_1;
            }
        ],
        execute: function () {
            /**
             * STOMP Client Class.
             *
             * Part of `@stomp/stompjs`.
             */
            Client = /** @class */ (function () {
                /**
                 * Create an instance.
                 */
                function Client(conf) {
                    if (conf === void 0) { conf = {}; }
                    /**
                     * STOMP versions to attempt during STOMP handshake. By default versions `1.0`, `1.1`, and `1.2` are attempted.
                     *
                     * Example:
                     * ```javascript
                     *        // Try only versions 1.0 and 1.1
                     *        client.stompVersions = new Versions(['1.0', '1.1'])
                     * ```
                     */
                    this.stompVersions = versions_2.Versions.default;
                    /**
                     *  automatically reconnect with delay in milliseconds, set to 0 to disable.
                     */
                    this.reconnectDelay = 5000;
                    /**
                     * Incoming heartbeat interval in milliseconds. Set to 0 to disable.
                     */
                    this.heartbeatIncoming = 10000;
                    /**
                     * Outgoing heartbeat interval in milliseconds. Set to 0 to disable.
                     */
                    this.heartbeatOutgoing = 10000;
                    /**
                     * This switches on a non standard behavior while sending WebSocket packets.
                     * It splits larger (text) packets into chunks of [maxWebSocketChunkSize]{@link Client#maxWebSocketChunkSize}.
                     * Only Java Spring brokers seems to use this mode.
                     *
                     * WebSockets, by itself, split large (text) packets,
                     * so it is not needed with a truly compliant STOMP/WebSocket broker.
                     * Actually setting it for such broker will cause large messages to fail.
                     *
                     * `false` by default.
                     *
                     * Binary frames are never split.
                     */
                    this.splitLargeFrames = false;
                    /**
                     * See [splitLargeFrames]{@link Client#splitLargeFrames}.
                     * This has no effect if [splitLargeFrames]{@link Client#splitLargeFrames} is `false`.
                     */
                    this.maxWebSocketChunkSize = 8 * 1024;
                    /**
                     * Usually the
                     * [type of WebSocket frame]{@link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send#Parameters}
                     * is automatically decided by type of the payload.
                     * Default is `false`, which should work with all compliant brokers.
                     *
                     * Set this flag to force binary frames.
                     */
                    this.forceBinaryWSFrames = false;
                    /**
                     * A bug in ReactNative chops a string on occurrence of a NULL.
                     * See issue [https://github.com/stomp-js/stompjs/issues/89]{@link https://github.com/stomp-js/stompjs/issues/89}.
                     * This makes incoming WebSocket messages invalid STOMP packets.
                     * Setting this flag attempts to reverse the damage by appending a NULL.
                     * If the broker splits a large message into multiple WebSocket messages,
                     * this flag will cause data loss and abnormal termination of connection.
                     *
                     * This is not an ideal solution, but a stop gap until the underlying issue is fixed at ReactNative library.
                     */
                    this.appendMissingNULLonIncoming = false;
                    this._active = false;
                    // Dummy callbacks
                    var noOp = function () { };
                    this.debug = noOp;
                    this.beforeConnect = noOp;
                    this.onConnect = noOp;
                    this.onDisconnect = noOp;
                    this.onUnhandledMessage = noOp;
                    this.onUnhandledReceipt = noOp;
                    this.onUnhandledFrame = noOp;
                    this.onStompError = noOp;
                    this.onWebSocketClose = noOp;
                    this.onWebSocketError = noOp;
                    this.logRawCommunication = false;
                    // These parameters would typically get proper values before connect is called
                    this.connectHeaders = {};
                    this._disconnectHeaders = {};
                    // Apply configuration
                    this.configure(conf);
                }
                Object.defineProperty(Client.prototype, "webSocket", {
                    /**
                     * Underlying WebSocket instance, READONLY.
                     */
                    get: function () {
                        return this._webSocket;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Client.prototype, "disconnectHeaders", {
                    /**
                     * Disconnection headers.
                     */
                    get: function () {
                        return this._disconnectHeaders;
                    },
                    set: function (value) {
                        this._disconnectHeaders = value;
                        if (this._stompHandler) {
                            this._stompHandler.disconnectHeaders = this._disconnectHeaders;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Client.prototype, "connected", {
                    /**
                     * `true` if there is a active connection with STOMP Broker
                     */
                    get: function () {
                        return (!!this._stompHandler) && this._stompHandler.connected;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Client.prototype, "connectedVersion", {
                    /**
                     * version of STOMP protocol negotiated with the server, READONLY
                     */
                    get: function () {
                        return this._stompHandler ? this._stompHandler.connectedVersion : undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Client.prototype, "active", {
                    /**
                     * if the client is active (connected or going to reconnect)
                     */
                    get: function () {
                        return this._active;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Update configuration.
                 */
                Client.prototype.configure = function (conf) {
                    // bulk assign all properties to this
                    Object.assign(this, conf);
                };
                /**
                 * Initiate the connection with the broker.
                 * If the connection breaks, as per [Client#reconnectDelay]{@link Client#reconnectDelay},
                 * it will keep trying to reconnect.
                 *
                 * Call [Client#deactivate]{@link Client#deactivate} to disconnect and stop reconnection attempts.
                 */
                Client.prototype.activate = function () {
                    this._active = true;
                    this._connect();
                };
                Client.prototype._connect = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (this.connected) {
                                        this.debug('STOMP: already connected, nothing to do');
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, this.beforeConnect()];
                                case 1:
                                    _a.sent();
                                    if (!this._active) {
                                        this.debug('Client has been marked inactive, will not attempt to connect');
                                        return [2 /*return*/];
                                    }
                                    this.debug('Opening Web Socket...');
                                    // Get the actual WebSocket (or a similar object)
                                    this._webSocket = this._createWebSocket();
                                    this._stompHandler = new stomp_handler_1.StompHandler(this, this._webSocket, {
                                        debug: this.debug,
                                        stompVersions: this.stompVersions,
                                        connectHeaders: this.connectHeaders,
                                        disconnectHeaders: this._disconnectHeaders,
                                        heartbeatIncoming: this.heartbeatIncoming,
                                        heartbeatOutgoing: this.heartbeatOutgoing,
                                        splitLargeFrames: this.splitLargeFrames,
                                        maxWebSocketChunkSize: this.maxWebSocketChunkSize,
                                        forceBinaryWSFrames: this.forceBinaryWSFrames,
                                        logRawCommunication: this.logRawCommunication,
                                        appendMissingNULLonIncoming: this.appendMissingNULLonIncoming,
                                        onConnect: function (frame) {
                                            if (!_this._active) {
                                                _this.debug('STOMP got connected while deactivate was issued, will disconnect now');
                                                _this._disposeStompHandler();
                                                return;
                                            }
                                            _this.onConnect(frame);
                                        },
                                        onDisconnect: function (frame) {
                                            _this.onDisconnect(frame);
                                        },
                                        onStompError: function (frame) {
                                            _this.onStompError(frame);
                                        },
                                        onWebSocketClose: function (evt) {
                                            _this.onWebSocketClose(evt);
                                            // The callback is called before attempting to reconnect, this would allow the client
                                            // to be `deactivated` in the callback.
                                            if (_this._active) {
                                                _this._schedule_reconnect();
                                            }
                                        },
                                        onWebSocketError: function (evt) {
                                            _this.onWebSocketError(evt);
                                        },
                                        onUnhandledMessage: function (message) {
                                            _this.onUnhandledMessage(message);
                                        },
                                        onUnhandledReceipt: function (frame) {
                                            _this.onUnhandledReceipt(frame);
                                        },
                                        onUnhandledFrame: function (frame) {
                                            _this.onUnhandledFrame(frame);
                                        }
                                    });
                                    this._stompHandler.start();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                Client.prototype._createWebSocket = function () {
                    var webSocket;
                    if (this.webSocketFactory) {
                        webSocket = this.webSocketFactory();
                    }
                    else {
                        webSocket = new WebSocket(this.brokerURL, this.stompVersions.protocolVersions());
                    }
                    webSocket.binaryType = 'arraybuffer';
                    return webSocket;
                };
                Client.prototype._schedule_reconnect = function () {
                    var _this = this;
                    if (this.reconnectDelay > 0) {
                        this.debug("STOMP: scheduling reconnection in " + this.reconnectDelay + "ms");
                        this._reconnector = setTimeout(function () {
                            _this._connect();
                        }, this.reconnectDelay);
                    }
                };
                /**
                 * Disconnect if connected and stop auto reconnect loop.
                 * Appropriate callbacks will be invoked if underlying STOMP connection was connected.
                 *
                 * To reactivate you can call [Client#activate]{@link Client#activate}.
                 */
                Client.prototype.deactivate = function () {
                    // indicate that auto reconnect loop should terminate
                    this._active = false;
                    // Clear if a reconnection was scheduled
                    if (this._reconnector) {
                        clearTimeout(this._reconnector);
                    }
                    this._disposeStompHandler();
                };
                /**
                 * Force disconnect if there is an active connection by directly closing the underlying WebSocket.
                 * This is different than a normal disconnect where a DISCONNECT sequence is carried out with the broker.
                 * After forcing disconnect, automatic reconnect will be attempted.
                 * To stop further reconnects call [Client#deactivate]{@link Client#deactivate} as well.
                 */
                Client.prototype.forceDisconnect = function () {
                    if (this._webSocket) {
                        if (this._webSocket.readyState === web_socket_state_2.WebSocketState.CONNECTING
                            || this._webSocket.readyState === web_socket_state_2.WebSocketState.OPEN) {
                            this._stompHandler._closeWebsocket();
                        }
                    }
                };
                Client.prototype._disposeStompHandler = function () {
                    // Dispose STOMP Handler
                    if (this._stompHandler) {
                        this._stompHandler.dispose();
                        this._stompHandler = null;
                    }
                };
                /**
                 * Send a message to a named destination. Refer to your STOMP broker documentation for types
                 * and naming of destinations.
                 *
                 * STOMP protocol specifies and suggests some headers and also allows broker specific headers.
                 *
                 * `body` must be String.
                 * You will need to covert the payload to string in case it is not string (e.g. JSON).
                 *
                 * To send a binary message body use binaryBody parameter. It should be a
                 * [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).
                 * Sometimes brokers may not support binary frames out of the box.
                 * Please check your broker documentation.
                 *
                 * `content-length` header is automatically added to the STOMP Frame sent to the broker.
                 * Set `skipContentLengthHeader` to indicate that `content-length` header should not be added.
                 * For binary messages `content-length` header is always added.
                 *
                 * Caution: The broker will, most likely, report an error and disconnect if message body has NULL octet(s)
                 * and `content-length` header is missing.
                 *
                 * ```javascript
                 *        client.publish({destination: "/queue/test", headers: {priority: 9}, body: "Hello, STOMP"});
                 *
                 *        // Only destination is mandatory parameter
                 *        client.publish({destination: "/queue/test", body: "Hello, STOMP"});
                 *
                 *        // Skip content-length header in the frame to the broker
                 *        client.publish({"/queue/test", body: "Hello, STOMP", skipContentLengthHeader: true});
                 *
                 *        var binaryData = generateBinaryData(); // This need to be of type Uint8Array
                 *        // setting content-type header is not mandatory, however a good practice
                 *        client.publish({destination: '/topic/special', binaryBody: binaryData,
                 *                         headers: {'content-type': 'application/octet-stream'}});
                 * ```
                 */
                Client.prototype.publish = function (params) {
                    this._stompHandler.publish(params);
                };
                /**
                 * STOMP brokers may carry out operation asynchronously and allow requesting for acknowledgement.
                 * To request an acknowledgement, a `receipt` header needs to be sent with the actual request.
                 * The value (say receipt-id) for this header needs to be unique for each use. Typically a sequence, a UUID, a
                 * random number or a combination may be used.
                 *
                 * A complaint broker will send a RECEIPT frame when an operation has actually been completed.
                 * The operation needs to be matched based in the value of the receipt-id.
                 *
                 * This method allow watching for a receipt and invoke the callback
                 * when corresponding receipt has been received.
                 *
                 * The actual {@link FrameImpl} will be passed as parameter to the callback.
                 *
                 * Example:
                 * ```javascript
                 *        // Subscribing with acknowledgement
                 *        let receiptId = randomText();
                 *
                 *        client.watchForReceipt(receiptId, function() {
                 *          // Will be called after server acknowledges
                 *        });
                 *
                 *        client.subscribe(TEST.destination, onMessage, {receipt: receiptId});
                 *
                 *
                 *        // Publishing with acknowledgement
                 *        receiptId = randomText();
                 *
                 *        client.watchForReceipt(receiptId, function() {
                 *          // Will be called after server acknowledges
                 *        });
                 *        client.publish({destination: TEST.destination, headers: {receipt: receiptId}, body: msg});
                 * ```
                 */
                Client.prototype.watchForReceipt = function (receiptId, callback) {
                    this._stompHandler.watchForReceipt(receiptId, callback);
                };
                /**
                 * Subscribe to a STOMP Broker location. The callback will be invoked for each received message with
                 * the {@link IMessage} as argument.
                 *
                 * Note: The library will generate an unique ID if there is none provided in the headers.
                 *       To use your own ID, pass it using the headers argument.
                 *
                 * ```javascript
                 *        callback = function(message) {
                 *        // called when the client receives a STOMP message from the server
                 *          if (message.body) {
                 *            alert("got message with body " + message.body)
                 *          } else {
                 *            alert("got empty message");
                 *          }
                 *        });
                 *
                 *        var subscription = client.subscribe("/queue/test", callback);
                 *
                 *        // Explicit subscription id
                 *        var mySubId = 'my-subscription-id-001';
                 *        var subscription = client.subscribe(destination, callback, { id: mySubId });
                 * ```
                 */
                Client.prototype.subscribe = function (destination, callback, headers) {
                    if (headers === void 0) { headers = {}; }
                    return this._stompHandler.subscribe(destination, callback, headers);
                };
                /**
                 * It is preferable to unsubscribe from a subscription by calling
                 * `unsubscribe()` directly on {@link StompSubscription} returned by `client.subscribe()`:
                 *
                 * ```javascript
                 *        var subscription = client.subscribe(destination, onmessage);
                 *        // ...
                 *        subscription.unsubscribe();
                 * ```
                 *
                 * See: http://stomp.github.com/stomp-specification-1.2.html#UNSUBSCRIBE UNSUBSCRIBE Frame
                 */
                Client.prototype.unsubscribe = function (id, headers) {
                    if (headers === void 0) { headers = {}; }
                    this._stompHandler.unsubscribe(id, headers);
                };
                /**
                 * Start a transaction, the returned {@link ITransaction} has methods - [commit]{@link ITransaction#commit}
                 * and [abort]{@link ITransaction#abort}.
                 *
                 * `transactionId` is optional, if not passed the library will generate it internally.
                 */
                Client.prototype.begin = function (transactionId) {
                    return this._stompHandler.begin(transactionId);
                };
                /**
                 * Commit a transaction.
                 *
                 * It is preferable to commit a transaction by calling [commit]{@link ITransaction#commit} directly on
                 * {@link ITransaction} returned by [client.begin]{@link Client#begin}.
                 *
                 * ```javascript
                 *        var tx = client.begin(txId);
                 *        //...
                 *        tx.commit();
                 * ```
                 */
                Client.prototype.commit = function (transactionId) {
                    this._stompHandler.commit(transactionId);
                };
                /**
                 * Abort a transaction.
                 * It is preferable to abort a transaction by calling [abort]{@link ITransaction#abort} directly on
                 * {@link ITransaction} returned by [client.begin]{@link Client#begin}.
                 *
                 * ```javascript
                 *        var tx = client.begin(txId);
                 *        //...
                 *        tx.abort();
                 * ```
                 */
                Client.prototype.abort = function (transactionId) {
                    this._stompHandler.abort(transactionId);
                };
                /**
                 * ACK a message. It is preferable to acknowledge a message by calling [ack]{@link IMessage#ack} directly
                 * on the {@link IMessage} handled by a subscription callback:
                 *
                 * ```javascript
                 *        var callback = function (message) {
                 *          // process the message
                 *          // acknowledge it
                 *          message.ack();
                 *        };
                 *        client.subscribe(destination, callback, {'ack': 'client'});
                 * ```
                 */
                Client.prototype.ack = function (messageId, subscriptionId, headers) {
                    if (headers === void 0) { headers = {}; }
                    this._stompHandler.ack(messageId, subscriptionId, headers);
                };
                /**
                 * NACK a message. It is preferable to acknowledge a message by calling [nack]{@link IMessage#nack} directly
                 * on the {@link IMessage} handled by a subscription callback:
                 *
                 * ```javascript
                 *        var callback = function (message) {
                 *          // process the message
                 *          // an error occurs, nack it
                 *          message.nack();
                 *        };
                 *        client.subscribe(destination, callback, {'ack': 'client'});
                 * ```
                 */
                Client.prototype.nack = function (messageId, subscriptionId, headers) {
                    if (headers === void 0) { headers = {}; }
                    this._stompHandler.nack(messageId, subscriptionId, headers);
                };
                return Client;
            }());
            exports_25("Client", Client);
        }
    };
});
System.register("Receiver", ["dependencies/webstomp/client"], function (exports_26, context_26) {
    "use strict";
    var client_1, Receiver;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [
            function (client_1_1) {
                client_1 = client_1_1;
            }
        ],
        execute: function () {
            Receiver = /** @class */ (function () {
                /**
                 *
                 */
                function Receiver() {
                    //this.url = url;
                    this.client = new client_1.Client({
                        brokerURL: "ws://localhost:15674/ws",
                        connectHeaders: {
                            login: "guest",
                            passcode: "guest"
                        },
                        debug: function (str) {
                            console.log(str);
                        },
                        reconnectDelay: 5000,
                        heartbeatIncoming: 4000,
                        heartbeatOutgoing: 4000
                    });
                    this.client.onConnect = this.onConnect;
                    this.client.onStompError = this.onError;
                }
                Receiver.prototype.connect = function () {
                    this.client.activate();
                };
                Receiver.prototype.onConnect = function (frame) {
                    console.log("Connected");
                };
                Receiver.prototype.onError = function (frame) {
                    console.log("Error");
                };
                return Receiver;
            }());
            exports_26("Receiver", Receiver);
        }
    };
});
System.register("PrototypeCanvas", ["tools/RectangleTool", "tools/MorphingPolygonTool", "CanvasHistory", "tools/LineTool", "CanvasInstance", "tools/TextTool"], function (exports_27, context_27) {
    "use strict";
    var RectangleTool_1, MorphingPolygonTool_1, CanvasHistory_1, LineTool_1, CanvasInstance_6, TextTool_1, PrototypeCanvas;
    var __moduleName = context_27 && context_27.id;
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
                    // this.receiver = new Receiver();
                    // this.receiver.connect();
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
            exports_27("PrototypeCanvas", PrototypeCanvas);
        }
    };
});
System.register("main", ["PrototypeCanvas", "DraggableElement", "Receiver"], function (exports_28, context_28) {
    "use strict";
    var ProtoTypeCanvas_1, DraggableElement_1, Receiver_1, prototypeCanvas, draggableElements, receiver, i, element, draggable;
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [
            function (ProtoTypeCanvas_1_1) {
                ProtoTypeCanvas_1 = ProtoTypeCanvas_1_1;
            },
            function (DraggableElement_1_1) {
                DraggableElement_1 = DraggableElement_1_1;
            },
            function (Receiver_1_1) {
                Receiver_1 = Receiver_1_1;
            }
        ],
        execute: function () {
            prototypeCanvas = new ProtoTypeCanvas_1.PrototypeCanvas();
            draggableElements = document.getElementsByClassName('draggable');
            receiver = new Receiver_1.Receiver();
            receiver.connect();
            for (i = 0; i < draggableElements.length; i++) {
                element = draggableElements[i];
                draggable = new DraggableElement_1.DraggableElement(element);
            }
        }
    };
});
System.register("dependencies/webstomp/compatibility/heartbeat-info", [], function (exports_29, context_29) {
    "use strict";
    var HeartbeatInfo;
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [],
        execute: function () {
            /**
             * Part of `@stomp/stompjs`.
             *
             * @internal
             */
            HeartbeatInfo = /** @class */ (function () {
                function HeartbeatInfo(client) {
                    this.client = client;
                }
                Object.defineProperty(HeartbeatInfo.prototype, "outgoing", {
                    get: function () {
                        return this.client.heartbeatOutgoing;
                    },
                    set: function (value) {
                        this.client.heartbeatOutgoing = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HeartbeatInfo.prototype, "incoming", {
                    get: function () {
                        return this.client.heartbeatIncoming;
                    },
                    set: function (value) {
                        this.client.heartbeatIncoming = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return HeartbeatInfo;
            }());
            exports_29("HeartbeatInfo", HeartbeatInfo);
        }
    };
});
System.register("dependencies/webstomp/compatibility/compat-client", ["dependencies/webstomp/client", "dependencies/webstomp/compatibility/heartbeat-info"], function (exports_30, context_30) {
    "use strict";
    var client_2, heartbeat_info_1, CompatClient;
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [
            function (client_2_1) {
                client_2 = client_2_1;
            },
            function (heartbeat_info_1_1) {
                heartbeat_info_1 = heartbeat_info_1_1;
            }
        ],
        execute: function () {
            /**
             * Available for backward compatibility, please shift to using {@link Client}.
             *
             * **Deprecated**
             *
             * Part of `@stomp/stompjs`.
             *
             * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
             */
            CompatClient = /** @class */ (function (_super) {
                __extends(CompatClient, _super);
                /**
                 * Available for backward compatibility, please shift to using {@link Client}
                 * and [Client#webSocketFactory]{@link Client#webSocketFactory}.
                 *
                 * **Deprecated**
                 *
                 * @internal
                 */
                function CompatClient(webSocketFactory) {
                    var _this = _super.call(this) || this;
                    /**
                     * It is no op now. No longer needed. Large packets work out of the box.
                     */
                    _this.maxWebSocketFrameSize = 16 * 1024;
                    _this._heartbeatInfo = new heartbeat_info_1.HeartbeatInfo(_this);
                    _this.reconnect_delay = 0;
                    _this.webSocketFactory = webSocketFactory;
                    // Default from previous version
                    _this.debug = function () {
                        var message = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            message[_i] = arguments[_i];
                        }
                        console.log.apply(console, message);
                    };
                    return _this;
                }
                CompatClient.prototype._parseConnect = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var closeEventCallback;
                    var connectCallback;
                    var errorCallback;
                    var headers = {};
                    if (args.length < 2) {
                        throw new Error(('Connect requires at least 2 arguments'));
                    }
                    if (typeof (args[1]) === 'function') {
                        headers = args[0], connectCallback = args[1], errorCallback = args[2], closeEventCallback = args[3];
                    }
                    else {
                        switch (args.length) {
                            case 6:
                                headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], closeEventCallback = args[4], headers.host = args[5];
                                break;
                            default:
                                headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], closeEventCallback = args[4];
                        }
                    }
                    return [headers, connectCallback, errorCallback, closeEventCallback];
                };
                /**
                 * Available for backward compatibility, please shift to using [Client#activate]{@link Client#activate}.
                 *
                 * **Deprecated**
                 *
                 * The `connect` method accepts different number of arguments and types. See the Overloads list. Use the
                 * version with headers to pass your broker specific options.
                 *
                 * overloads:
                 * - connect(headers, connectCallback)
                 * - connect(headers, connectCallback, errorCallback)
                 * - connect(login, passcode, connectCallback)
                 * - connect(login, passcode, connectCallback, errorCallback)
                 * - connect(login, passcode, connectCallback, errorCallback, closeEventCallback)
                 * - connect(login, passcode, connectCallback, errorCallback, closeEventCallback, host)
                 *
                 * params:
                 * - headers, see [Client#connectHeaders]{@link Client#connectHeaders}
                 * - connectCallback, see [Client#onConnect]{@link Client#onConnect}
                 * - errorCallback, see [Client#onStompError]{@link Client#onStompError}
                 * - closeEventCallback, see [Client#onWebSocketClose]{@link Client#onWebSocketClose}
                 * - login [String], see [Client#connectHeaders](../classes/Client.html#connectHeaders)
                 * - passcode [String], [Client#connectHeaders](../classes/Client.html#connectHeaders)
                 * - host [String], see [Client#connectHeaders](../classes/Client.html#connectHeaders)
                 *
                 * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
                 */
                CompatClient.prototype.connect = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var out = this._parseConnect.apply(this, args);
                    if (out[0]) {
                        this.connectHeaders = out[0];
                    }
                    if (out[1]) {
                        this.onConnect = out[1];
                    }
                    if (out[2]) {
                        this.onStompError = out[2];
                    }
                    if (out[3]) {
                        this.onWebSocketClose = out[3];
                    }
                    _super.prototype.activate.call(this);
                };
                /**
                 * Available for backward compatibility, please shift to using [Client#deactivate]{@link Client#deactivate}.
                 *
                 * **Deprecated**
                 *
                 * See:
                 * [Client#onDisconnect]{@link Client#onDisconnect}, and
                 * [Client#disconnectHeaders]{@link Client#disconnectHeaders}
                 *
                 * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
                 */
                CompatClient.prototype.disconnect = function (disconnectCallback, headers) {
                    if (headers === void 0) { headers = {}; }
                    if (disconnectCallback) {
                        this.onDisconnect = disconnectCallback;
                    }
                    this.disconnectHeaders = headers;
                    _super.prototype.deactivate.call(this);
                };
                /**
                 * Available for backward compatibility, use [Client#publish]{@link Client#publish}.
                 *
                 * Send a message to a named destination. Refer to your STOMP broker documentation for types
                 * and naming of destinations. The headers will, typically, be available to the subscriber.
                 * However, there may be special purpose headers corresponding to your STOMP broker.
                 *
                 *  **Deprecated**, use [Client#publish]{@link Client#publish}
                 *
                 * Note: Body must be String. You will need to covert the payload to string in case it is not string (e.g. JSON)
                 *
                 * ```javascript
                 *        client.send("/queue/test", {priority: 9}, "Hello, STOMP");
                 *
                 *        // If you want to send a message with a body, you must also pass the headers argument.
                 *        client.send("/queue/test", {}, "Hello, STOMP");
                 * ```
                 *
                 * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
                 */
                CompatClient.prototype.send = function (destination, headers, body) {
                    if (headers === void 0) { headers = {}; }
                    if (body === void 0) { body = ''; }
                    headers = Object.assign({}, headers);
                    var skipContentLengthHeader = (headers['content-length'] === false);
                    if (skipContentLengthHeader) {
                        delete headers['content-length'];
                    }
                    this.publish({
                        destination: destination,
                        headers: headers,
                        body: body,
                        skipContentLengthHeader: skipContentLengthHeader
                    });
                };
                Object.defineProperty(CompatClient.prototype, "reconnect_delay", {
                    /**
                     * Available for backward compatibility, renamed to [Client#reconnectDelay]{@link Client#reconnectDelay}.
                     *
                     * **Deprecated**
                     */
                    set: function (value) {
                        this.reconnectDelay = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompatClient.prototype, "ws", {
                    /**
                     * Available for backward compatibility, renamed to [Client#webSocket]{@link Client#webSocket}.
                     *
                     * **Deprecated**
                     */
                    get: function () {
                        return this._webSocket;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompatClient.prototype, "version", {
                    /**
                     * Available for backward compatibility, renamed to [Client#connectedVersion]{@link Client#connectedVersion}.
                     *
                     * **Deprecated**
                     */
                    get: function () {
                        return this.connectedVersion;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompatClient.prototype, "onreceive", {
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledMessage]{@link Client#onUnhandledMessage}.
                     *
                     * **Deprecated**
                     */
                    get: function () {
                        return this.onUnhandledMessage;
                    },
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledMessage]{@link Client#onUnhandledMessage}.
                     *
                     * **Deprecated**
                     */
                    set: function (value) {
                        this.onUnhandledMessage = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompatClient.prototype, "onreceipt", {
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledReceipt]{@link Client#onUnhandledReceipt}.
                     * Prefer using [Client#watchForReceipt]{@link Client#watchForReceipt}.
                     *
                     * **Deprecated**
                     */
                    get: function () {
                        return this.onUnhandledReceipt;
                    },
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledReceipt]{@link Client#onUnhandledReceipt}.
                     *
                     * **Deprecated**
                     */
                    set: function (value) {
                        this.onUnhandledReceipt = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompatClient.prototype, "heartbeat", {
                    /**
                     * Available for backward compatibility, renamed to [Client#heartbeatIncoming]{@link Client#heartbeatIncoming}
                     * [Client#heartbeatOutgoing]{@link Client#heartbeatOutgoing}.
                     *
                     * **Deprecated**
                     */
                    get: function () {
                        return this._heartbeatInfo;
                    },
                    /**
                     * Available for backward compatibility, renamed to [Client#heartbeatIncoming]{@link Client#heartbeatIncoming}
                     * [Client#heartbeatOutgoing]{@link Client#heartbeatOutgoing}.
                     *
                     * **Deprecated**
                     */
                    set: function (value) {
                        this.heartbeatIncoming = value.incoming;
                        this.heartbeatOutgoing = value.outgoing;
                    },
                    enumerable: true,
                    configurable: true
                });
                return CompatClient;
            }(client_2.Client));
            exports_30("CompatClient", CompatClient);
        }
    };
});
System.register("dependencies/webstomp/compatibility/stomp", ["dependencies/webstomp/versions", "dependencies/webstomp/compatibility/compat-client"], function (exports_31, context_31) {
    "use strict";
    var versions_3, compat_client_1, Stomp;
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [
            function (versions_3_1) {
                versions_3 = versions_3_1;
            },
            function (compat_client_1_1) {
                compat_client_1 = compat_client_1_1;
            }
        ],
        execute: function () {
            Stomp = /** @class */ (function () {
                /**
                 * STOMP Class, acts like a factory to create {@link Client}.
                 *
                 * Part of `@stomp/stompjs`.
                 *
                 * **Deprecated**
                 *
                 * It will be removed in next major version. Please switch to {@link Client}.
                 */
                function Stomp() {
                }
                /**
                 * This method creates a WebSocket client that is connected to
                 * the STOMP server located at the url.
                 *
                 * ```javascript
                 *        var url = "ws://localhost:61614/stomp";
                 *        var client = Stomp.client(url);
                 * ```
                 *
                 * **Deprecated**
                 *
                 * It will be removed in next major version. Please switch to {@link Client}
                 * using [Client#brokerURL]{@link Client#brokerURL}.
                 */
                Stomp.client = function (url, protocols) {
                    // This is a hack to allow another implementation than the standard
                    // HTML5 WebSocket class.
                    //
                    // It is possible to use another class by calling
                    //
                    //     Stomp.WebSocketClass = MozWebSocket
                    //
                    // *prior* to call `Stomp.client()`.
                    //
                    // This hack is deprecated and `Stomp.over()` method should be used
                    // instead.
                    // See remarks on the function Stomp.over
                    if (protocols == null) {
                        protocols = versions_3.Versions.default.protocolVersions();
                    }
                    var wsFn = function () {
                        var klass = Stomp.WebSocketClass || WebSocket;
                        return new klass(url, protocols);
                    };
                    return new compat_client_1.CompatClient(wsFn);
                };
                /**
                 * This method is an alternative to [Stomp#client]{@link Stomp#client} to let the user
                 * specify the WebSocket to use (either a standard HTML5 WebSocket or
                 * a similar object).
                 *
                 * In order to support reconnection, the function Client._connect should be callable more than once.
                 * While reconnecting
                 * a new instance of underlying transport (TCP Socket, WebSocket or SockJS) will be needed. So, this function
                 * alternatively allows passing a function that should return a new instance of the underlying socket.
                 *
                 * ```javascript
                 *        var client = Stomp.over(function(){
                 *          return new WebSocket('ws://localhost:15674/ws')
                 *        });
                 * ```
                 *
                 * **Deprecated**
                 *
                 * It will be removed in next major version. Please switch to {@link Client}
                 * using [Client#webSocketFactory]{@link Client#webSocketFactory}.
                 */
                Stomp.over = function (ws) {
                    var wsFn;
                    if (typeof (ws) === 'function') {
                        wsFn = ws;
                    }
                    else {
                        console.warn('Stomp.over did not receive a factory, auto reconnect will not work. ' +
                            'Please see https://stomp-js.github.io/api-docs/latest/classes/Stomp.html#over');
                        wsFn = function () { return ws; };
                    }
                    return new compat_client_1.CompatClient(wsFn);
                };
                /**
                 * In case you need to use a non standard class for WebSocket.
                 *
                 * For example when using within NodeJS environment:
                 *
                 * ```javascript
                 *        StompJs = require('../../esm5/');
                 *        Stomp = StompJs.Stomp;
                 *        Stomp.WebSocketClass = require('websocket').w3cwebsocket;
                 * ```
                 *
                 * **Deprecated**
                 *
                 *
                 * It will be removed in next major version. Please switch to {@link Client}
                 * using [Client#webSocketFactory]{@link Client#webSocketFactory}.
                 */
                // tslint:disable-next-line:variable-name
                Stomp.WebSocketClass = null;
                return Stomp;
            }());
            exports_31("Stomp", Stomp);
        }
    };
});
System.register("dependencies/webstomp/index", ["dependencies/webstomp/client", "dependencies/webstomp/frame-impl", "dependencies/webstomp/parser", "dependencies/webstomp/stomp-config", "dependencies/webstomp/stomp-headers", "dependencies/webstomp/stomp-subscription", "dependencies/webstomp/versions", "dependencies/webstomp/web-socket-state", "dependencies/webstomp/compatibility/compat-client", "dependencies/webstomp/compatibility/stomp"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_32(exports);
    }
    return {
        setters: [
            function (client_3_1) {
                exportStar_1(client_3_1);
            },
            function (frame_impl_2_1) {
                exportStar_1(frame_impl_2_1);
            },
            function (parser_2_1) {
                exportStar_1(parser_2_1);
            },
            function (stomp_config_1_1) {
                exportStar_1(stomp_config_1_1);
            },
            function (stomp_headers_1_1) {
                exportStar_1(stomp_headers_1_1);
            },
            function (stomp_subscription_1_1) {
                exportStar_1(stomp_subscription_1_1);
            },
            function (versions_4_1) {
                exportStar_1(versions_4_1);
            },
            function (web_socket_state_3_1) {
                exportStar_1(web_socket_state_3_1);
            },
            function (compat_client_2_1) {
                exportStar_1(compat_client_2_1);
            },
            function (stomp_1_1) {
                exportStar_1(stomp_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=bundle.js.map