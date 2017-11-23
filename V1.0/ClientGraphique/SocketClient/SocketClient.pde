  

import processing.net.*; 

Client myClient; 
int dataIn; 
 
void setup() { 
  size(200, 200); 
  // Connect to the local machine at port 5204.
  // This example will not run if you haven't
  // previously started a server on this port.
  myClient = new Client(this, "ws://localhost", 3000); 
} 
 
void draw() { 
 
} 

// ClientEvent message is generated when the server 
// sends data to an existing client.
void clientEvent(Client someClient) {
  print("Server Says:  ");
  dataIn = myClient.read();
  println(dataIn);
}