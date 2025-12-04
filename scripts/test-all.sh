#!/bin/bash

# Load environment variables from .env file, but do not override already-set env vars
if [ -f .env ]; then
    while IFS= read -r line || [ -n "$line" ]; do
        # skip empty lines and comments
        case "$line" in
            ''|\#*) continue ;;
        esac
        key="${line%%=*}"
        # only export if not already set in environment
        if [ -z "${!key}" ]; then
            export "$line"
        fi
    done < .env
fi

# Allow passing a year as the first positional argument, else use AOC_YEAR env, else current year
YEAR=${1:-${AOC_YEAR:-$(date +%Y)}}

# Find all test files for the specified year (sorted)
# Use mapfile to preserve file order and handle filenames safely
mapfile -t testFiles < <(find "./test/${YEAR}/" -name "*.test.ts" | sort)

# Check if any test files were found
if [ ${#testFiles[@]} -eq 0 ]; then
    echo "No test files found for year ${YEAR}."
    exit 0
fi

# Run each test file sequentially in sorted order so output appears deterministically
for f in "${testFiles[@]}"; do
    echo "Running tests: $f"
    jest --passWithNoTests "$f"
    status=$?
    if [ $status -ne 0 ]; then
        echo "Tests failed for $f (exit $status)"
        exit $status
    fi
done