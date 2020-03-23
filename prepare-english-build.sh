#!/bin/bash

rm ./index.html ./404.html ./_config.yml ./public/img/favicon/site.webmanifest

cp ./english/index.html ./index.html

cp ./english/404.html ./404.html

cp ./english/_config.yml ./_config.yml

cp ./public/img/favicon/site.webmanifest.english ./public/img/favicon/site.webmanifest
