import { Point } from "../Point";
import { CanvasInstance } from "../CanvasInstance";
import { Line } from "../models/Line";

export class LineTool implements ICanvasTool {
    private fromPoint: Point;
    private toPoint: Point;
    private drawInProgress : boolean;
    private dragInProgress : boolean;

    /**
     *
     */
    constructor(point1: Point = new Point(), point2: Point = new Point()) {
        this.fromPoint = point1;
        this.toPoint = point2;
    }

    mouseDownEventHandler(e: MouseEvent) {
        this.dragInProgress = true;
        let x = e.clientX - CanvasInstance.Canvas().offsetLeft;
        let y = e.clientY - CanvasInstance.Canvas().offsetTop;

        this.fromPoint = new Point(x, y);
    }

    mouseUpEventHandler(e: MouseEvent) {
        this.dragInProgress = false;
        let x = e.clientX - CanvasInstance.Canvas().offsetLeft;
        let y = e.clientY - CanvasInstance.Canvas().offsetTop;

        this.toPoint = new Point(x, y);
        CanvasInstance.HistoryManager().add(CanvasInstance.Context().getImageData(0, 0, CanvasInstance.Canvas().width, CanvasInstance.Canvas().height));
    }

    mouseMoveEventHandler(e: MouseEvent) {
        let x = e.clientX - CanvasInstance.Canvas().offsetLeft;
        let y = e.clientY - CanvasInstance.Canvas().offsetTop;
        
        this.toPoint = new Point(x, y);

        if(this.dragInProgress){
            CanvasInstance.Context().putImageData(CanvasInstance.HistoryManager().getCurrentState(), 0, 0);

            this.draw();
        }
    }
    
    keyDownEventHandler(e: KeyboardEvent) {
        // do nothing
    }

    public draw() {
        if(this.fromPoint == undefined || this.toPoint == undefined) 
            return;
        
        var line = new Line(this.fromPoint, this.toPoint);

        line.draw();
    }
}