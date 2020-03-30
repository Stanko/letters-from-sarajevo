#!/bin/bash

# remove english files
rm ./index.html ./_config.yml ./404.html

# copy serbian files
mv ./sr/index.html ./index.html
cp ./sr/404.html ./404.html
cp ./sr/_config.yml ./_config.yml

# remove old build
npm run clean

# build assets
npm run build-assets

# build jekyll
npm run build-jekyll

# create redirects for other languages
mkdir ./_site/en
cp ./sr/en.html ./_site/en/index.html
rm ./_site/sr/en.html

mkdir ./_site/ru
cp ./sr/ru.html ./_site/ru/index.html
rm ./_site/sr/ru.html
