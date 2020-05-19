import { CanvasHistoryManager } from "./CanvasHistory";

export abstract class CanvasInstance {
    private static currentContext : CanvasRenderingContext2D;
    private static canvasHistory : CanvasHistoryManager;
    private static canvas : HTMLCanvasElement;

    public static Canvas() : HTMLCanvasElement {
        return this.canvas;
    }

    public static SetCurrentCanvas(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public static Context(): CanvasRenderingContext2D {
        return this.currentContext;
    }

    public static SetCurrentContext(context: CanvasRenderingContext2D) {
        this.currentContext = context;
    }

    public static HistoryManager(): CanvasHistoryManager {
        return this.canvasHistory;
    }

    public static SetHistoryManager(historyManager: CanvasHistoryManager) {
        this.canvasHistory = historyManager;
    }
}