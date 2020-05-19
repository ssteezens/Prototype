import { PrototypeCanvas } from "./ProtoTypeCanvas";
import { DraggableElement } from "./DraggableElement";

var prototypeCanvas = new PrototypeCanvas();
var draggableElements = document.getElementsByClassName('draggable');

for(var i = 0; i < draggableElements.length; i++){
    var element = draggableElements[i] as HTMLElement;
    var draggable = new DraggableElement(element); 
}