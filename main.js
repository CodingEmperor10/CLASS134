song = "";
Status = "";
objects =[];

function setup()
{
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(380,380);
objectdetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function preload()
{
    song = loadSound("ringing_old_phone.mp3");
}

function draw()
{
image(video,0 , 0, 380, 380);
if(Status  != ""){

  r = random(255);
  g = random(255);
  b = random(255);
  document.getElementById("status").innerHTML = "STATUS : OBJECT DETECTED ";
    objectdetector.detect(video, gotResult);

 for(i = 0; i < objects.length; i++){
     document.getElementById("NOB").innerHTML = "Number of Objects : " + objects.length;

     fill(r,g,b);
     percent = floor(objects[i].confidence * 100);
     text(objects[i].label + " " + percent + " % ", objects[i].x + 15, objects[i].y + 15); 
    noFill();
    stroke(r,g,b); 
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

    if(objects[i].label == "person"){
     document.getElementById("NOB").innerHTML = "Baby Found";
    song.stop();
    }
    else{
        document.getElementById("NOB").innerHTML = "Baby Not Found";
        song.play(); 
    }
 }   
 if(objects.length  == 0){
 document.getElementById("NOB").innerHTML = "Baby Not Found";
     song.play();
 }
}
}

function modelLoaded() {
 console.log("Model Loaded");
 Status = true;   
}

function gotResult(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}