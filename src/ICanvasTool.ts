interface ICanvasTool {
    mouseDownEventHandler(e: MouseEvent);
    mouseUpEventHandler(e: MouseEvent);
    mouseMoveEventHandler(e: MouseEvent);
    keyDownEventHandler(e: KeyboardEvent);
    draw();
}