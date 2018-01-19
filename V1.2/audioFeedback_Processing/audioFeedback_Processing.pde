import ddf.minim.*;
import dmxP512.*;
import processing.serial.*;

// Audio stuffs ---------------------
Minim minim;
AudioInput in;

// DMX stuffs ----------------------
DmxP512 dmxOutput;
int universeSize=128;

// MAC PORT
//String DMXPRO_PORT="/dev/tty.usbserial-EN160112";//case matters ! on windows port must be upper cased.
String DMXPRO_PORT="/dev/ttyUSB0";
int DMXPRO_BAUDRATE=115000;


void setup() {
  size(300, 300);
  background(255);
    
  // Create an Input stream which is routed into the Amplitude analyzer
  minim = new Minim(this);
  // use the getLineIn method of the Minim object to get an AudioInput
  in = minim.getLineIn();
  
  dmxOutput=new DmxP512(this,universeSize,false);
  dmxOutput.setupDmxPro(DMXPRO_PORT,DMXPRO_BAUDRATE);
  
}      

void draw() {
  
  background(150);
  // Calculation of average volume
  // draw the waveforms so we can see what we are monitoring
  float avgVolume = 0;
  if(in.bufferSize() > 0){
  for(int i = 0; i < in.bufferSize() - 1; i++)
  {
    avgVolume += 0.5 * abs(in.left.get(i)) + 0.5 * abs(in.right.get(i));
  }
  avgVolume = avgVolume / in.bufferSize();
  }
  
  float analyse = map(avgVolume, 0, 0.02, 0, 1);
  float radius = analyse * 300;
  int dmxBrightness = (int)constrain(map(analyse, 0, 1, 50, 255), 50, 255);
  
  fill(230);
  ellipse(width/2, height/2, radius, radius);
  
  dmxOutput.set(1,dmxBrightness);
  dmxOutput.set(2,100);
  
  println("analyse : " + Float.toString(analyse) + "\tradius : " + Float.toString(radius) + "\tdmxBrightness : " + Float.toString(dmxBrightness)); 
  
}