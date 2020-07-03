#!/bin/bash

# remove old build
if ! npm run clean
then
  echo ERROR: build failed
  exit 1 # terminate and indicate error
fi

# build assets
if ! npm run build-assets
then
  echo ERROR: build failed
  exit 2 # terminate and indicate error
fi

# build jekyll
if ! npm run build-jekyll
then
  echo ERROR: build failed
  exit 3 # terminate and indicate error
fi

# create redirect for serbian version
mkdir ./_site/sr
cp ./en/sr.html ./_site/sr/index.html
rm ./_site/en/sr.html
