#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs -d '\n')
fi

# Set default value for YEAR if not defined in .env
YEAR=${AOC_YEAR:-$(date +%Y)}

# Find all test files for the specified year
testFiles=$(find "./test/${YEAR}/" -name "*.test.ts")

# Check if any test files were found
if [ -z "$testFiles" ]; then
    echo "No test files found for year ${YEAR}."
    exit 0
fi

# Run all test files as a single suite
jest --passWithNoTests $testFiles