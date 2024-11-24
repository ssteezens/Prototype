import { CanvasInstance } from "../CanvasInstance";
import { Point } from "../Point";

export class BlockTool implements ICanvasTool {
    private blockSize: number = 20;
    private color: string;
    
    constructor(blockSize: number, color: string = "red") {
        this.blockSize = blockSize;
        this.color = color;
    }

    mouseDownEventHandler(e: MouseEvent) {
        let x = e.clientX - CanvasInstance.Canvas().offsetLeft;
        let y = e.clientY - CanvasInstance.Canvas().offsetTop;

        CanvasInstance.Context().fillStyle = this.color;
        CanvasInstance.Context().fillRect(x, y, this.blockSize, this.blockSize);
    }

    mouseUpEventHandler(e: MouseEvent) { }

    mouseMoveEventHandler(e: MouseEvent) { }

    keyDownEventHandler(e: KeyboardEvent) { }

    public draw() { }
}