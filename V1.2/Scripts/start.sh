#!/bin/bash

rm -f nohup.out

# Run speech to text server
cd "/home/erasme/BriseGlace-V1.x/V1.2/SpeechToTextServer"
nohup node GoogleSpeech_FileServer.js &

#!/bin/sh
# Run chromium start
cd "/home/erasme/BriseGlace-V1.x/V1.2/Scripts"
./startChromium.sh &

# Run window manager
#exec openbox
