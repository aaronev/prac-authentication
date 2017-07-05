#!/bin/bash

# If script doesn't execute: command line: $chmod a+x start.sh

npm run db:drop
npm run db:create
npm run db:schema
npm run db:seed