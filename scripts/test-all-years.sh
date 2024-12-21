#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs -d '\n')
fi

# Find all test files for all years
testFiles=$(find "./test/" -name "*.test.ts")

# Check if any test files were found
if [ -z "$testFiles" ]; then
    echo "No test files found."
    exit 0
fi

# Run all test files as a single suite
jest --passWithNoTests $testFiles
