#!/bin/bash

# Advent of Code - Run Visualization Script

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs -d '\n')
fi

# Set default value for YEAR if not defined in .env
YEAR=${AOC_YEAR:-$(date +%Y)}
DAY=$1

echo "Running visualization for Year $YEAR, Day $DAY..."

# Build and run the visualization
npx esbuild src/$YEAR/$DAY/visualize.ts --bundle --platform=node --outfile=dist/visualize.js --format=esm

node dist/visualize.js