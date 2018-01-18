import processing.sound.*;
import dmxP512.*;
import processing.serial.*;

// Audio stuffs ---------------------
Amplitude amp;
AudioIn in;

// DMX stuffs ----------------------
DmxP512 dmxOutput;
int universeSize=128;

String DMXPRO_PORT="/dev/tty.usbserial-EN160112";//case matters ! on windows port must be upper cased.
int DMXPRO_BAUDRATE=115000;


void setup() {
  size(300, 300);
  background(255);
    
  // Create an Input stream which is routed into the Amplitude analyzer
  amp = new Amplitude(this);
  in = new AudioIn(this, 0);
  in.start();
  amp.input(in);
  
  dmxOutput=new DmxP512(this,universeSize,false);
  dmxOutput.setupDmxPro(DMXPRO_PORT,DMXPRO_BAUDRATE);
  
}      

void draw() {
  
  background(150);
  float analyse = map(amp.analyze(), 0, 0.02, 0, 1);
  float radius = analyse * 300;
  int dmxBrightness = (int)constrain(map(analyse, 0, 1, 50, 255), 50, 255);
  
  fill(230);
  ellipse(width/2, height/2, radius, radius);
  
  dmxOutput.set(1,dmxBrightness);
  
  println("analyse : " + Float.toString(analyse) + "\tradius : " + Float.toString(radius) + "\tdmxBrightness : " + Float.toString(dmxBrightness)); 
  
}