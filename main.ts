import { PrototypeCanvas } from "./ProtoTypeCanvas";

// look into browserify, parceljs, other types of loaders

document.onreadystatechange = function(e) {
    if(document.readyState == "complete"){
        console.log("hello");
    }
}

function load() {
    console.log("Hello");
    var prototypeCanvas = new PrototypeCanvas();
}