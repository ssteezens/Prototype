import { Point } from "../Point";
import { CanvasInstance } from "../CanvasInstance";
import { MorphingPolygon } from "../models/MorphingPolygon";

export class MorphingPolygonTool implements ICanvasTool {    
    private dragInProgress: boolean;
    private mouseDownPoint: Point;
    private mouseUpPoint: Point;

    /**
     *  Creates a rectangle from two points.
     */
    constructor() {
    }
    
    keyDownEventHandler(e: KeyboardEvent) {
        // do nothing
    }

    mouseDownEventHandler(e: MouseEvent) {
        this.dragInProgress = true;

        let x = e.clientX - CanvasInstance.Canvas().offsetLeft;
        let y = e.clientY - CanvasInstance.Canvas().offsetTop;

        this.mouseDownPoint = new Point(x, y);
    }

    mouseUpEventHandler(e: MouseEvent) {
        this.dragInProgress = false;
        let x = e.clientX - CanvasInstance.Canvas().offsetLeft;
        let y = e.clientY - CanvasInstance.Canvas().offsetTop;
        
        this.mouseUpPoint = new Point(x, y);

        this.draw();
        CanvasInstance.HistoryManager().add(CanvasInstance.Context().getImageData(0, 0, CanvasInstance.Canvas().width, CanvasInstance.Canvas().height));
    }
    
    mouseMoveEventHandler(e: MouseEvent) {
        let x = e.clientX - CanvasInstance.Canvas().offsetLeft;
        let y = e.clientY - CanvasInstance.Canvas().offsetTop;
        
        this.mouseUpPoint = new Point(x, y);

        if(this.dragInProgress){
            CanvasInstance.Context().putImageData(CanvasInstance.HistoryManager().getCurrentState(), 0, 0);

            this.draw();
        }
    }

    public draw() {
        var rectangle = new MorphingPolygon(this.mouseDownPoint, this.mouseUpPoint);

        rectangle.draw();
    }
}