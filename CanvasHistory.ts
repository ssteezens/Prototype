export class CanvasHistoryManager {
    private drawHistory: ImageData[] = [];
    private canvasContext: CanvasRenderingContext2D;
    private currentStateIndex: number = 0;

    /**
     * Initializes canvas with a specified draw history.
     */
    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;
    }

    /**
     * Undo the last canvas draw.
     */ 
    public undo() {
        if(this.currentStateIndex > 0)
            this.currentStateIndex--;

        this.canvasContext.putImageData(this.getCurrentState(), 0, 0);
    }

    /**
     * Redo the last canvas draw.
     */
    public redo() {
        if(this.currentStateIndex < this.drawHistory.length - 1)
            this.currentStateIndex++;

        this.canvasContext.putImageData(this.getCurrentState(), 0, 0);
    }

    /**
     * Add the image data to the draw history.
     * @param imageData The image data to add to the draw history.
     */
    public add(imageData: ImageData) {
        // remove all history from currentStateIndex to drawHistory.length
        if(this.currentStateIndex < this.drawHistory.length - 1)
            this.drawHistory.splice(this.currentStateIndex, this.drawHistory.length - this.currentStateIndex - 1);

        // add to drawHistory
        this.drawHistory.push(imageData);
        this.currentStateIndex = this.drawHistory.length - 1;
    }

    /**
     * Retrieve the canvas's current draw state.
     */
    public getCurrentState() {
        return this.drawHistory[this.currentStateIndex];
    }
}