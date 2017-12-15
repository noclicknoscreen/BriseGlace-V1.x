#!/bin/sh

SERVER_FILE="./V1.1/SpeechToTextServer/GoogleSpeech_FileServer.js"

export GOOGLE_APPLICATION_CREDENTIALS="BriseGlace-DevToken.json"

echo "Launch server ..."

node ${SERVER_FILE}
