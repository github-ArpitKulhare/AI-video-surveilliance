objects = [];
video = "";
status = "";

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(310, 220);
    canvas.position(535, 300)
}

function draw() {
    image(video, 0, 0, 480, 380)
    if(status != "") {
        objectDetection.detect(video, gotResults)

        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Detecting Object";
            document.getElementById("no._objects").innerHTML = "Number of objects detected : " + objects.length;

            fill("#00FFFF");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15)
            noFill();
            stroke(5, "#DFFF00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start() {
    objectDetection = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object"
}

function ModelLoaded() {
    console.log("Model Loaded")
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResults(error, results) {
    if(error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}