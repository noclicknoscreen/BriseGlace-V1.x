#!/bin/bash

cd "$(echo $0 | rev | cut -d "/" -f 2- | rev)"


# Run speech to text server
cd "../SpeechToTextServer"
# nohup node GoogleSpeech_FileServer.js &
sleep 3
gnome-terminal -e "node GoogleSpeech_FileServer.js"

# Run processing (Speech to DMX)
cd "../Scripts"
sleep 3
gnome-terminal -e "./startProcessing.sh &"

#!/bin/sh
# Run chromium start
cd "../Scripts"
sleep 10
./startChromium.sh &

# Run window manager
#exec openbox
