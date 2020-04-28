import { Point } from "./Point";
import { Rectangle } from "./Rectangle";
import { MorphingPolygon } from "./MorphingPolygon";

export class PrototypeCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private drawInProgress: boolean;
    private currentPolygon: MorphingPolygon; 
    private mouseDownPoint: Point;
    private mouseUpPoint: Point;
    private drawHistory: ImageData[] = [];
    private currentCanvasState: ImageData;

    /**
     * Default constructor.  Initializes the canvas and context.
     */
    constructor() {
        console.log("hello");
        this.canvas = document.getElementById('TheCanvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");   
        this.currentPolygon = new Rectangle();
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.currentCanvasState = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

        this.canvas.addEventListener("mousedown", this.mouseDownEventHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpEventHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler);
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
        this.currentPolygon = new Rectangle(this.mouseDownPoint, this.mouseUpPoint);

        if(this.drawInProgress){
            this.context.putImageData(this.currentCanvasState, 0, 0);

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
        this.currentPolygon = new Rectangle(this.mouseDownPoint, this.mouseUpPoint);

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
        this.currentCanvasState = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

        this.drawHistory.push(this.currentCanvasState);
    }
}

