#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs -d '\n')
fi

# Set default value for YEAR if not defined in .env
YEAR=${AOC_YEAR:-$(date +%Y)}
DAY=$1
jest --passWithNoTests ./test/${YEAR}/${DAY}.test.ts
