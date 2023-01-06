var my_status = "";

var x = 0;
var y = 0;
var width = 0;
var height = 0;
var object_name = "";
var object_accuracy = 0;
var objects = [];

function preload() {
    image_chair.jpg = loadImage("chair.jpeg");

function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("Status").innerHTML = "Status :  Loading Model";
}

function draw() {
    image(image_chair.jpg, 0, 0, 700, 500);

    if (my_status != "") {

        document.getElementById("Status").innerHTML = "Status :  Objects are Detected";

        for (var i = 0; i < objects.length; i++) {
            noFill();
            stroke("green");
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;
            rect(x, y, width, height);
            fill("green");
            textSize(30);
            object_name = objects[i].label;
            // 0.9856856685233 * 100  = 98.56856685233 = 98.56
            object_accuracy = (objects[i].confidence * 100).toFixed(2);
            
            text(object_name + " " +object_accuracy + "%", x, y);

        }




    }

}

function modelloaded() {
    console.log(" Model is Loaded ");
    document.getElementById("Status").innerHTML = "Status :  Detecting Objects";
    objectDetector.detect(image_chair.jpg, got_results);

}

function got_results(error, results){
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
        my_status = true;

    }
 }
}
