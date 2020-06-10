import { PrototypeCanvas } from "./ProtoTypeCanvas";
import { DraggableElement } from "./DraggableElement";
import { Receiver } from "./Receiver";

var prototypeCanvas = new PrototypeCanvas();
var draggableElements = document.getElementsByClassName('draggable');
var receiver = new Receiver();

receiver.connect();

for(var i = 0; i < draggableElements.length; i++){
    var element = draggableElements[i] as HTMLElement;
    var draggable = new DraggableElement(element); 
}