import { Point } from "./Point";
import { Rectangle } from "./Rectangle";
import { MorphingPolygon } from "./MorphingPolygon";
import { CanvasHistoryManager } from "./CanvasHistory";

export class PrototypeCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private drawInProgress: boolean;
    private currentPolygon: MorphingPolygon; 
    private mouseDownPoint: Point;
    private mouseUpPoint: Point;
    private canvasHistory: CanvasHistoryManager;
    private undoButton: HTMLButtonElement;
    private redoButton: HTMLButtonElement;

    /**
     * Default constructor.  Initializes the canvas and context.
     */
    constructor() {
        console.log("hello");
        this.canvas = document.getElementById('TheCanvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");   
        this.currentPolygon = new MorphingPolygon();
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.canvasHistory = new CanvasHistoryManager(this.context);
        this.canvasHistory.add(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));

        this.canvas.addEventListener("mousedown", this.mouseDownEventHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpEventHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler);

        this.undoButton = document.getElementById("UndoButton") as HTMLButtonElement;
        this.redoButton = document.getElementById("RedoButton") as HTMLButtonElement;
        this.undoButton.addEventListener("click", this.undoButtonClickEventHandler);
        this.redoButton.addEventListener("click", this.redoButtonClickEventHandler);
    }

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
        this.drawInProgress = true;

        let x = e.clientX - this.canvas.offsetLeft;
        let y = e.clientY - this.canvas.offsetTop;

        this.mouseDownPoint = new Point(x, y);
    }

    /**  
     * Event handler for canvas mouse move event.
     */
    private mouseMoveEventHandler = (e: MouseEvent) => {
        let x = e.clientX - this.canvas.offsetLeft;
        let y = e.clientY - this.canvas.offsetTop;
        
        this.mouseUpPoint = new Point(x, y);
        this.currentPolygon = new MorphingPolygon(this.mouseDownPoint, this.mouseUpPoint);

        if(this.drawInProgress){
            this.context.putImageData(this.canvasHistory.getCurrentState(), 0, 0);

            this.drawPolygon(this.currentPolygon);
        }
    }

    /**  
     * Event handler for canvas mouse up event.
     */
    private mouseUpEventHandler = (e: MouseEvent) => {
        this.drawInProgress = false;
        let x = e.clientX - this.canvas.offsetLeft;
        let y = e.clientY - this.canvas.offsetTop;
        
        this.mouseUpPoint = new Point(x, y);
        this.currentPolygon = new MorphingPolygon(this.mouseDownPoint, this.mouseUpPoint);

        this.drawPolygon(this.currentPolygon);
        this.saveCanvasState();
    }

    /**
     * Draws a rectangle on the canvas. 
     * @param polygon The polygon to draw.
     */    
    private drawPolygon(polygon: MorphingPolygon) {
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

