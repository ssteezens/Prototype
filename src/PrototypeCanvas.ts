import { Point } from "./Point";
import { RectangleTool } from "./tools/RectangleTool";
import { MorphingPolygonTool } from "./tools/MorphingPolygonTool";
import { CanvasHistoryManager } from "./CanvasHistory";
import { LineTool } from "./tools/LineTool";
import { CanvasInstance } from "./CanvasInstance";
import { TextTool } from "./tools/TextTool";
import { Receiver } from "./Receiver";
import { BlockTool } from "./tools/BlockTool";
import { Line } from "./models/Line";

export class PrototypeCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private canvasHistory: CanvasHistoryManager;
    private gridLinesButton: HTMLButtonElement;
    private undoButton: HTMLButtonElement;
    private redoButton: HTMLButtonElement;
    private infoDisplay: HTMLParagraphElement;
    private saveButton: HTMLButtonElement;
    private morphingPolygonToolOption: HTMLButtonElement;
    private rectangleToolOption: HTMLButtonElement;
    private textToolOption: HTMLButtonElement;
    private lineToolOption: HTMLButtonElement;
    private blockToolOption: HTMLButtonElement;
    private currentTool: ICanvasTool;
    private receiver: Receiver;
    private gridVisible: boolean = false;

    /**
     * Default constructor.  Initializes the canvas and context.
     */
    constructor() {
        console.log("hello");
        this.canvas = document.getElementById('TheCanvas') as HTMLCanvasElement;
        this.infoDisplay = document.getElementById('InfoDisplay') as HTMLParagraphElement;
        this.context = this.canvas.getContext("2d");   
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.canvasHistory = new CanvasHistoryManager(this.context);
        this.canvasHistory.add(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
        this.currentTool = new MorphingPolygonTool();

        CanvasInstance.SetCurrentCanvas(this.canvas);
        CanvasInstance.SetCurrentContext(this.context);
        CanvasInstance.SetHistoryManager(this.canvasHistory);
        
        this.canvas.addEventListener("mousedown", this.mouseDownEventHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpEventHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler);
        this.canvas.addEventListener("resize", this.canvasOnResizeEventHandler);

        document.addEventListener("keydown", this.keyboardDownEventHandler);

        // edit buttons
        this.gridLinesButton = document.getElementById("GridLinesButton") as HTMLButtonElement;
        this.undoButton = document.getElementById("UndoButton") as HTMLButtonElement;
        this.redoButton = document.getElementById("RedoButton") as HTMLButtonElement;
        this.saveButton = document.getElementById("SaveButton") as HTMLButtonElement;

        // drawing tools
        this.textToolOption = document.getElementById("TextToolOption") as HTMLButtonElement;
        this.lineToolOption = document.getElementById("LineToolOption") as HTMLButtonElement;
        this.rectangleToolOption = document.getElementById("RectangleToolOption") as HTMLButtonElement;
        this.morphingPolygonToolOption = document.getElementById("MorphingPolygonToolOption") as HTMLButtonElement;
        this.blockToolOption = document.getElementById("BlockToolOption") as HTMLButtonElement;

        // button event handlers
        this.gridLinesButton.addEventListener("click", this.gridLinesButtonClickEventHandler);
        this.undoButton.addEventListener("click", this.undoButtonClickEventHandler);
        this.redoButton.addEventListener("click", this.redoButtonClickEventHandler);
        this.saveButton.addEventListener("click", this.saveButtonClickEventHandler);
        this.textToolOption.addEventListener("click", this.textToolClickEventHandler);
        this.lineToolOption.addEventListener("click", this.lineToolOptionClickEventHandler);
        this.rectangleToolOption.addEventListener("click", this.rectangleToolClickEventHandler);
        this.morphingPolygonToolOption.addEventListener("click", this.morphingRectangleToolClickEventHandler);
        this.blockToolOption.addEventListener("click", this.blockToolOptionClickEventHandler);
    }

    /**
     * Event handler for morphing rectangle option click event.
     */
    private morphingRectangleToolClickEventHandler = (e: Event) => {
        this.currentTool = new MorphingPolygonTool();
    }
 
    /**
     * Event handler for rectangle tool option click event.
     */
    private rectangleToolClickEventHandler = (e: Event) => {
        this.currentTool = new RectangleTool();
    }

    /**
     * Event handler for text tool option click event.
     */
    private textToolClickEventHandler = (e: Event) => {
        this.currentTool = new TextTool();
    }

    /**
     * Event handler for line tool option click event.
     */
    private lineToolOptionClickEventHandler = (e: Event) => {
        this.currentTool = new LineTool();
    }

    private blockToolOptionClickEventHandler = (e: Event) => {
        this.currentTool = new BlockTool();
    }

    /**
     * Event handler for the key down event.  Manages keyboard shortcuts
     */
    private keyboardDownEventHandler = (e: KeyboardEvent) => {
        // undo keyboard shortcut
        if(e.keyCode == 90 && e.ctrlKey)
            this.canvasHistory.undo();
        // redo keyboard shortcut
        if(e.keyCode == 89 && e.ctrlKey)
            this.canvasHistory.redo();
        
        this.currentTool.keyDownEventHandler(e);
    }

    /**
     * Event handler 
     */
    private saveButtonClickEventHandler = (e: Event) => {
        let image = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        window.location.href = image;
    };

    private createGrid() {
        const blockSize = 20;
        const xLineCount = this.canvas.height / blockSize;
        const yLineCount = this.canvas.width / blockSize;
        const gridOverlay = document.getElementById('GridOverlay');

        var currentYPoint = 0;
        for(var i = 0; i < xLineCount; i++) {
            var gridLine = document.createElement('div');

            gridLine.classList.add('grid-line-x');
            gridLine.style.top = `${currentYPoint}px`;

            gridOverlay.appendChild(gridLine);

            currentYPoint += blockSize;
        }

        var currentXPoint = 0;
        for(var i = 0; i < yLineCount; i++) {
            var gridLine = document.createElement('div');

            gridLine.classList.add('grid-line-y');
            gridLine.style.left = `${currentXPoint}px`;

            gridOverlay.appendChild(gridLine);

            currentXPoint += blockSize;
        }
    }

    private gridLinesButtonClickEventHandler = (e: Event) => {
        this.gridVisible = !this.gridVisible;
        const gridOverlay = document.getElementById('GridOverlay');
        gridOverlay.style.display = this.gridVisible ? 'block' : 'none';
        
        if (this.gridVisible && gridOverlay.children.length === 0) {
            this.createGrid();
        }
    }

    /**
     * Event handler for the undo button. Calls the canvas history to undo the last action.
     */
    private undoButtonClickEventHandler = (e: Event) => {
        this.canvasHistory.undo();
    }

    /**
     * Event handler for the redo button. Calls the canvas hsitory to redo any undone action.
     */
    private redoButtonClickEventHandler = (e: Event) => {
        this.canvasHistory.redo();
    }

    /**  
     * Event handler for canvas mouse down event.
     */
    private mouseDownEventHandler = (e: MouseEvent) =>  {
        this.currentTool.mouseDownEventHandler(e);
    }

    /**  
     * Event handler for canvas mouse move event.
     */
    private mouseMoveEventHandler = (e: MouseEvent) => {
        let x = e.clientX - this.canvas.offsetLeft;
        let y = e.clientY - this.canvas.offsetTop;
        
        this.infoDisplay.innerText = "X: " + x + " Y: " + y;

        this.currentTool.mouseMoveEventHandler(e);
    }

    /**  
     * Event handler for canvas mouse up event.
     */
    private mouseUpEventHandler = (e: MouseEvent) => {
        this.currentTool.mouseUpEventHandler(e);
    }

    /**
     * Event handler for when the canvas is resized.
     */
    private canvasOnResizeEventHandler() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    };
}