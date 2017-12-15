#!/bin/sh

SERVER_DIR="./V1.1/SpeechToTextServer/"
SERVER_FILE="./GoogleSpeech_FileServer.js"

export GOOGLE_APPLICATION_CREDENTIALS="BriseGlace-DevToken.json"

cd ${SERVER_DIR}

echo "Launch server ..."

node ${SERVER_FILE}
