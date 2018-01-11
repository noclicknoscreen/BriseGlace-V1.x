#!/bin/bash

rm -f nohup.out

# Run speech to text server
cd "../SpeechToTextServer"
nohup node GoogleSpeech_FileServer.js &

#!/bin/sh
# Run chromium start
cd "../Scripts"
./startChromium.sh &

# Run window manager
#exec openbox
