#!/bin/bash

# remove old build
npm run clean

# build assets
npm run build-assets

# build jekyll
npm run build-jekyll

# create redirect for serbian version
mkdir ./_site/sr
cp ./en/sr.html ./_site/sr/index.html
rm ./_site/en/sr.html
