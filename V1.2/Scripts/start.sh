#!/bin/bash

cd "$(echo $0 | rev | cut -d "/" -f 2- | rev)"


# Run speech to text server
cd "../SpeechToTextServer"
# nohup node GoogleSpeech_FileServer.js &
sleep 1
gnome-terminal -e "node GoogleSpeech_FileServer.js"

# Run speech to text server
cd "../Scripts"
sleep 1
./startProcessing.sh &

#!/bin/sh
# Run chromium start
cd "../Scripts"
sleep 1
./startChromium.sh &

# Run window manager
#exec openbox
