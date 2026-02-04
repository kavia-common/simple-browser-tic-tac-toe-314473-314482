#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-browser-tic-tac-toe-314473-314482/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

