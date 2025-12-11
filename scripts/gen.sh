#!/bin/bash

esbuild ./scripts/gen.ts --bundle --platform=node | node - "$@"

# After successful generation, fetch the README
bash ./scripts/fetch-readme.sh "$@"