#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tictactoe-challenge-1278-eea4842d/tic_tac_toe_container
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

