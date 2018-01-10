#!/bin/bash

# Run speech to text server
nohup node "../BriseGlace-V1.x/V1.2/SpeechToTextServer/GoogleSpeech_FileServer.js" &

#!/bin/sh
# Run chromium start
../BriseGlace-V1.x/V1.2/startChromium.sh &

# Run window manager
#exec openbox
