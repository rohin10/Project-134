img="";
status1="";
objects=[];
// Create a new audio element
var audio = new Audio();

// Set the source of the audio element to the sound file URL
audio.src = "mixkit-classic-alarm-995.wav";

// Play the audio element
audio.play();
function preload(){
    
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()
    video.size(380,380)
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    if(objects[0].label == "person"){
        document.getElementById("status").innerHTML = "Baby Detected";
        audio.play();
    }
    else{
        document.getElementById("status").innerHTML = "Baby not Detected";
        audio.play();
    }
}
function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
    
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video,0,0,380,380);
    if(status1 !=""){
        
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){

            document.getElementById("status").innerHTML="Status : Objects Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
    
}