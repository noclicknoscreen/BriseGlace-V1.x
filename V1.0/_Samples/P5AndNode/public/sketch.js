
var socket;

function setup() {
  createCanvas(600, 400);
  background(100);

  socket = io.connect('http://192.168.81.71:3000');
  socket.on('mouse', newDrawing);
}

function mouseDragged(){
  console.log('Sending : ' + mouseX + ',' + mouseY);
  var data = {
    x : mouseX,
    y : mouseY
  }
  socket.emit('mouse', data);

  // ------------------------------------------
  noStroke();
  fill(255, 0, 150);
  ellipse(mouseX, mouseY, 10, 10);

}

function draw() {
}

function newDrawing(data){
  noStroke();
  fill(150, 255, 0);
  ellipse(data.x, data.y , 10, 10);
}
