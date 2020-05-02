import { Point } from "./Point";

export class DraggableElement {
    private element: HTMLElement;
    private isDragging: boolean;
    private mouseDownPoint: Point;

    /**
     *
     */
    constructor(element: HTMLElement) {
        this.element = element;
        this.isDragging = false;

        this.element.addEventListener("mousedown", this.mouseDownEventHandler);
        document.addEventListener("mouseup", this.mouseUpEventHandler);
        document.addEventListener("mousemove", this.mouseMoveEventHandler);
    }

    private mouseDownEventHandler = (e: MouseEvent) => {
        this.isDragging = true;
        let x = e.clientX;
        let y = e.clientY;
        this.mouseDownPoint = new Point(x, y);
    }

    private mouseUpEventHandler = (e: MouseEvent) => {
        this.isDragging = false;
    }

    private mouseMoveEventHandler = (e: MouseEvent) => {
        if(this.isDragging)
            this.dragEventHandler(e);
    }

    private dragEventHandler = (e: MouseEvent) => {
        let x = e.clientX;
        let y = e.clientY;
        let deltaY = 0;
        let deltaX = 0;

        let currentPoint: Point = new Point(x, y);
        
        this.element.style.top = currentPoint.y + "px";
        this.element.style.left = currentPoint.x + "px";
    }
}