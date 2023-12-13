#!/usr/bin/env bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs -d '\n')
fi

# Set default value for YEAR if not defined in .env
YEAR=${AOC_YEAR:-$(date +%Y)}

DAY=$1
eslint ./src/${YEAR}/${DAY} ./src/utils --ext .ts $2
