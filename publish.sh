#!/bin/bash

if [ ! -d "output_prod" ]; then
    mkdir output_prod
    cd output_prod
    git init
    git remote add origin git@github.com:samjarrett/illridewithyou.git
    git fetch origin gh-pages
    git checkout gh-pages
    git pull origin gh-pages
    cd ../
fi

npm install

cd output_prod/

git add .

git commit -m "Published updates"

git push origin gh-pages

cd ..