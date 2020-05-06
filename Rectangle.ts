import { Point } from "./Point";
import { Line } from "./Line";

export class Rectangle {    

    public topLeft: Point;
    public bottomLeft: Point;
    public topRight: Point;
    public bottomRight: Point;

    /**
     *  Creates a rectangle from two points.
     */
    constructor(point1: Point = new Point(0,0), point2: Point = new Point(0,0)) {
        // point 1 is topleft and point 2 is bottom right
        if(point1.x < point2.x && point1.y < point2.y){
            this.topLeft = point1;
            this.bottomRight = point2;
            this.bottomLeft = new Point(this.topLeft.x, this.bottomRight.y);
            this.topRight = new Point(this.bottomRight.x, this.topLeft.y);
        }
        // point 1 is bottom left and point 2 top right
        if(point1.x < point2.x && point1.y > point2.y){
            this.bottomLeft = point1;
            this.topRight = point2;
            this.topLeft = new Point(this.bottomLeft.x, this.topRight.y);
            this.bottomRight = new Point(this.bottomLeft.y, this.topRight.x);
        }
        // point 1 is top right and point 2 is bottom left
        if(point1.x > point2.x && point1.y < point2.y) {
            this.topRight = point1;
            this.bottomLeft = point2;
            this.topLeft = new Point(this.bottomLeft.x, this.topRight.y);
            this.bottomRight = new Point(this.bottomLeft.y, this.topRight.x);
        }
        // point 1 is bottom right and point 2 is top left
        if(point1.x > point2.x && point1.y > point2.y){
            this.bottomRight = point1;
            this.topLeft = point2;
            this.bottomLeft = new Point(this.topLeft.x, this.bottomRight.y);
            this.topRight = new Point(this.bottomRight.x, this.topLeft.y);
        }
    }

    public draw(context: CanvasRenderingContext2D) {
        let left = new Line(this.topLeft, this.bottomLeft);
        let top = new Line(this.topLeft, this.topRight);
        let bottom = new Line(this.bottomLeft, this.bottomRight);
        let right = new Line(this.bottomRight, this.topRight);

        left.draw(context);
        top.draw(context);
        bottom.draw(context);
        right.draw(context);
    }
}