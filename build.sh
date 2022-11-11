#!/bin/bash

function main() {
    # install dependencies
    npm i postcss-cli autoprefixer stylus typescript

    # build
    npx tsc
    npx stylus src/*.styl --out public/
    npx postcss public/*.css --use autoprefixer -d public/
}

time main