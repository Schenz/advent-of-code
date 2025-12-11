#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs -d '\n')
fi

# Set default value for YEAR if not defined in .env
YEAR=${AOC_YEAR:-$(date +%Y)}

DAY=$1

# Create a temporary directory for the bundled script
TEMP_DIR=$(mktemp -d)
BUNDLED_SCRIPT="$TEMP_DIR/bundled_${DAY}.js"

# Copy node_modules so external dependencies can be found
cp -r node_modules "$TEMP_DIR/" 2>/dev/null || true

# Copy src directory to temp so relative paths work for input files
cp -r src "$TEMP_DIR/" 2>/dev/null || true

# Bundle the script to a temporary file, excluding z3-solver from bundling
# z3-solver needs to be loaded as a regular module so it can properly configure
# worker threads and find the wasm file
esbuild ./src/${YEAR}/${DAY}/main.ts --bundle --platform=node --external:z3-solver --outfile="$BUNDLED_SCRIPT"

# Change to temp directory so relative paths work
cd "$TEMP_DIR"

# Execute the bundled script from the temp directory
node "$BUNDLED_SCRIPT"

# Clean up
cd - > /dev/null
rm -rf "$TEMP_DIR"
