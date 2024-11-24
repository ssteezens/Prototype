import { Point } from "../Point";
import { CanvasInstance } from "../CanvasInstance";

export class Line {
    private fromPoint: Point;
    private toPoint: Point;

    constructor(point1: Point = new Point(), point2: Point = new Point()) {
        this.fromPoint = point1;
        this.toPoint = point2;
    }

    public draw() {
        if(this.fromPoint == undefined || this.toPoint == undefined) 
            return;
        CanvasInstance.Context().beginPath();
        CanvasInstance.Context().moveTo(this.fromPoint.x, this.fromPoint.y);
        CanvasInstance.Context().lineTo(this.toPoint.x, this.toPoint.y);
        CanvasInstance.Context().stroke();
        CanvasInstance.Context().closePath();
    }
}