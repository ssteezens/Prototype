export class CanvasHistory {
    private drawHistory: ImageData[] = [];
    private currentStateIndex: number = 0;

    /**
     *
     */
    constructor(drawHistory: ImageData[] = []) {
         this.drawHistory = drawHistory;
    }

    private undo() {
        if(this.currentStateIndex > 0)
            this.currentStateIndex--;
    }

    private redo() {
        if(this.currentStateIndex < this.drawHistory.length)
            this.currentStateIndex++;
    }

    private add(imageData: ImageData) {
        // remove all history from currentStateIndex to drawHistory.length
        this.drawHistory.splice(this.currentStateIndex, this.drawHistory.length - this.currentStateIndex - 1);

        // add to drawHistory
        this.drawHistory.push(imageData);
    }

    private getCurrentState() {
        return this.drawHistory[this.currentStateIndex];
    }
}