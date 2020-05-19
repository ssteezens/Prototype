import { CanvasInstance } from "../CanvasInstance";
import { Point } from "../Point";

export class TextTool implements ICanvasTool {

    private typingInProgress : boolean;
    private typingString : string = "";
    private mouseDownPoint : Point;
    private mouseUpPoint : Point;

    /**
     *
     */
    constructor() {
        
    }

    mouseDownEventHandler(e: MouseEvent) {
        let x = e.clientX - CanvasInstance.Canvas().offsetLeft;
        let y = e.clientY - CanvasInstance.Canvas().offsetTop;

        this.mouseDownPoint = new Point(x, y);

        this.typingInProgress = true;
    }

    mouseUpEventHandler(e: MouseEvent) {
        let x = e.clientX - CanvasInstance.Canvas().offsetLeft;
        let y = e.clientY - CanvasInstance.Canvas().offsetTop;
        
        this.mouseUpPoint = new Point(x, y);
    }

    mouseMoveEventHandler(e: MouseEvent) {
        // do nothing
    }

    keyDownEventHandler(e: KeyboardEvent) {
       // enter key
       if(e.keyCode == 13) {
            // end typing event if in progress
            if(this.typingInProgress){
                this.typingInProgress = false;
                this.typingString = "";
                // save canvas state
                CanvasInstance.HistoryManager().add(CanvasInstance.Context().getImageData(0, 0, CanvasInstance.Canvas().width, CanvasInstance.Canvas().height));
            }
        }
        // draw typing
        if(this.typingInProgress){
            CanvasInstance.Context().putImageData(CanvasInstance.HistoryManager().getCurrentState(), 0, 0);
            this.typingString += e.key;
            CanvasInstance.Context().font = "30px Ariel";
            CanvasInstance.Context().fillText(this.typingString, this.mouseDownPoint.x, this.mouseDownPoint.y);
        }
    }
    

    draw() {
        // todo:
    }

}