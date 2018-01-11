#!/bin/bash

cd "$(echo $0 | rev | cut -d "/" -f 2- | rev)"

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
