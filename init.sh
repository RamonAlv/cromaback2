#!/bin/bash

# check if workinig directory is empty
# Install adonisjs in the working directory if empty
if [[ -z "$(ls -A $PWD 2>/dev/null)" ]]; then
    adonis new . $adonisFlags
    # change host and port to work properly inside a Docker container
    sed -i -e "s/HOST=.*/HOST=0.0.0.0/g" .env
    sed -i -e "s/PORT=.*/PORT=80/g" .env
fi

# check for the .env file
if [[ -z "$(ls -A $PWD | grep .env)" ]]; then
    echo "no .env file found."
    exit 1
fi

# source the .env file so we can use the variables
source .env

# serve production build if the NODE_ENV is set to production
# serve with --dev flag if not in production
if [[ "$NODE_ENV" == "production" ]]; then
    adonis serve
else
    adonis serve --dev 
fi