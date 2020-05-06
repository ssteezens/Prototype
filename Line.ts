import { Point } from "./Point";

export class Line {
    private fromPoint: Point;
    private toPoint: Point;

    /**
     *
     */
    constructor(point1: Point, point2: Point) {
        this.fromPoint = point1;
        this.toPoint = point2;
    }

    public draw(context: CanvasRenderingContext2D) {
        if(this.fromPoint == undefined || this.toPoint == undefined) 
            return;
        context.beginPath();
        context.moveTo(this.fromPoint.x, this.fromPoint.y);
        context.lineTo(this.toPoint.x, this.toPoint.y);
        context.stroke();
        context.closePath();
    }
}