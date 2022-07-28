#!/bin/bash
read -p "Enter test file name (without .ts) `echo $'\n> '`" testFileName
cross-env NODE_ENV=debug jest --watch --runInBand "${testFileName}.ts"