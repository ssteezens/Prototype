import { Point } from "./Point";
import { Rectangle } from "./Rectangle";
import { MorphingPolygon } from "./MorphingPolygon";
import { CanvasHistoryManager } from "./CanvasHistory";

export class PrototypeCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private dragInProgress: boolean;
    private typingInProgress: boolean;
    private mouseDownPoint: Point;
    private mouseUpPoint: Point;
    private canvasHistory: CanvasHistoryManager;
    private undoButton: HTMLButtonElement;
    private redoButton: HTMLButtonElement;
    private infoDisplay: HTMLParagraphElement;
    private saveButton: HTMLButtonElement;
    private drawingMode: DrawingModes;
    private morphingPolygonToolOption: HTMLDivElement;
    private rectangleToolOption: HTMLDivElement;
    private textToolOption: HTMLDivElement;
    private lineToolOption: HTMLDivElement;
    private typingString: string;

    /**
     * Default constructor.  Initializes the canvas and context.
     */
    constructor() {
        console.log("hello");
        this.canvas = document.getElementById('TheCanvas') as HTMLCanvasElement;
        this.infoDisplay = document.getElementById('InfoDisplay') as HTMLParagraphElement;
        this.context = this.canvas.getContext("2d");   
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.canvasHistory = new CanvasHistoryManager(this.context);
        this.canvasHistory.add(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
        this.drawingMode = DrawingModes.MorphingPolygon;
        this.typingString = "";

        this.canvas.addEventListener("mousedown", this.mouseDownEventHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpEventHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler);
        this.canvas.addEventListener("resize", this.canvasOnResizeEventHandler);

        document.addEventListener("keydown", this.keyboardDownEventHandler);

        // edit buttons
        this.undoButton = document.getElementById("UndoButton") as HTMLButtonElement;
        this.redoButton = document.getElementById("RedoButton") as HTMLButtonElement;
        this.saveButton = document.getElementById("SaveButton") as HTMLButtonElement;

        // drawing tools
        this.textToolOption = document.getElementById("TextToolOption") as HTMLDivElement;
        this.lineToolOption = document.getElementById("LineToolOption") as HTMLDivElement;
        this.rectangleToolOption = document.getElementById("RectangleToolOption") as HTMLDivElement;
        this.morphingPolygonToolOption = document.getElementById("MorphingPolygonToolOption") as HTMLDivElement;

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
     * Event handler for morphing rectangle option click event.
     */
    private morphingRectangleToolClickEventHandler = (e: Event) => {
        this.drawingMode = DrawingModes.MorphingPolygon;
    }
 
    /**
     * Event handler for rectangle tool option click event.
     */
    private rectangleToolClickEventHandler = (e: Event) => {
        this.drawingMode = DrawingModes.Rectangle;
    }

    /**
     * Event handler for text tool option click event.
     */
    private textToolClickEventHandler = (e: Event) => {
        this.drawingMode = DrawingModes.Text;
    }

    /**
     * Event handler for line tool option click event.
     */
    private lineToolOptionClickEventHandler = (e: Event) => {
        this.drawingMode = DrawingModes.Line;
    }

    /**
     * Event handler for the key down event.  Manages keyboard shortcuts
     */
    private keyboardDownEventHandler = (e: KeyboardEvent) => {
        // undo keyboard shortcut
        if(e.keyCode == 90 && e.ctrlKey)
            this.canvasHistory.undo();
        // redo keyboard shortcut
        if(e.keyCode == 89 && e.ctrlKey)
            this.canvasHistory.redo();
        // enter key
        if(e.keyCode == 13) {
            // end typing event if in progress
            if(this.typingInProgress){
                this.typingInProgress = false;
                this.typingString = "";
                this.saveCanvasState();
            }
        }
        // draw typing
        if(this.typingInProgress){
            this.context.putImageData(this.canvasHistory.getCurrentState(), 0, 0);
            this.typingString += e.key;
            this.context.font = "30px Ariel";
            this.context.fillText(this.typingString, this.mouseDownPoint.x, this.mouseDownPoint.y);
        }
    }

    /**
     * Event handler 
     */
    private saveButtonClickEventHandler = (e: Event) => {
        let image = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        window.location.href = image;
    };

    /**
     * Event handler for the undo button. Calls the canvas history to undo the last action.
     */
    private undoButtonClickEventHandler = (e: Event) => {
        this.canvasHistory.undo();
    }

    /**
     * Event handler for the redo button. Calls the canvas hsitory to redo any undone action.
     */
    private redoButtonClickEventHandler = (e: Event) => {
        this.canvasHistory.redo();
    }

    /**  
     * Event handler for canvas mouse down event.
     */
    private mouseDownEventHandler = (e: MouseEvent) =>  {
        this.dragInProgress = true;

        let x = e.clientX - this.canvas.offsetLeft;
        let y = e.clientY - this.canvas.offsetTop;

        this.mouseDownPoint = new Point(x, y);

        if(this.drawingMode == DrawingModes.Text)
            this.typingInProgress = true;
    }

    /**  
     * Event handler for canvas mouse move event.
     */
    private mouseMoveEventHandler = (e: MouseEvent) => {
        let x = e.clientX - this.canvas.offsetLeft;
        let y = e.clientY - this.canvas.offsetTop;
        
        this.mouseUpPoint = new Point(x, y);
        this.infoDisplay.innerText = "X: " + x + " Y: " + y;

        if(this.dragInProgress){
            this.context.putImageData(this.canvasHistory.getCurrentState(), 0, 0);

            this.draw();
        }
    }

    /**  
     * Event handler for canvas mouse up event.
     */
    private mouseUpEventHandler = (e: MouseEvent) => {
        this.dragInProgress = false;
        let x = e.clientX - this.canvas.offsetLeft;
        let y = e.clientY - this.canvas.offsetTop;
        
        this.mouseUpPoint = new Point(x, y);

        this.draw();
        this.saveCanvasState();
    }

    /**
     * Draw on the canvas with the current drawing mode.
     */
    private draw() {

        switch(this.drawingMode) 
        {
            case DrawingModes.MorphingPolygon:
                var morphingPolygon = new MorphingPolygon(this.mouseDownPoint, this.mouseUpPoint);
                this.drawMorphingPolygon(morphingPolygon);
                break;
            case DrawingModes.Rectangle:
                var rectangle = new Rectangle(this.mouseDownPoint, this.mouseUpPoint);
                this.drawRectangle(rectangle);
                break;
            case DrawingModes.Line:
                this.drawLine(this.mouseDownPoint, this.mouseUpPoint);
                break;
        }
    }

    /**
     * Event handler for when the canvas is resized.
     */
    private canvasOnResizeEventHandler() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    };

    private drawRectangle(rectangle: Rectangle) {
        // draw left line
        this.drawLine(rectangle.topLeft, rectangle.bottomLeft);
        // draw top line
        this.drawLine(rectangle.topLeft, rectangle.topRight);
        // draw bottom line
        this.drawLine(rectangle.bottomLeft, rectangle.bottomRight);
        // draw right line
        this.drawLine(rectangle.bottomRight, rectangle.topRight);
    }

    /**
     * Draws a rectangle on the canvas. 
     * @param polygon The polygon to draw.
     */    
    private drawMorphingPolygon(polygon: MorphingPolygon) {
        // draw left line
        this.drawLine(polygon.topLeft, polygon.bottomLeft);
        // draw top line
        this.drawLine(polygon.topLeft, polygon.topRight);
        // draw bottom line
        this.drawLine(polygon.bottomLeft, polygon.bottomRight);
        // draw right line
        this.drawLine(polygon.bottomRight, polygon.topRight);
    }

    /**
     * Draws a line connecting two points.
     * @param pointOne The point to draw from.
     * @param pointTwo The point to draw to.
     */
    private drawLine(pointOne: Point, pointTwo: Point) {
        if(pointOne == undefined || pointTwo == undefined) 
            return;
        this.context.beginPath();
        this.context.moveTo(pointOne.x, pointOne.y);
        this.context.lineTo(pointTwo.x, pointTwo.y);
        this.context.stroke();
        this.context.closePath();
    }

    /**
     * Saves the current canvas state.
     */
    private saveCanvasState() {
        this.canvasHistory.add(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
    }
}

