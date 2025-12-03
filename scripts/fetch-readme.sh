#!/bin/bash

esbuild ./scripts/fetch-readme.ts --bundle --platform=node | node - "$@"