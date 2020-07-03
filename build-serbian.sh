#!/bin/bash

# remove english files
rm ./index.html ./_config.yml ./404.html

# copy serbian files
mv ./sr/index.html ./index.html
cp ./sr/404.html ./404.html
cp ./sr/_config.yml ./_config.yml

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

# create redirects for other languages
mkdir ./_site/en
cp ./sr/en.html ./_site/en/index.html
rm ./_site/sr/en.html

mkdir ./_site/ru
cp ./sr/ru.html ./_site/ru/index.html
rm ./_site/sr/ru.html

mkdir ./_site/pt-br
cp ./sr/pt-br.html ./_site/pt-br/index.html
rm ./_site/sr/pt-br.html
