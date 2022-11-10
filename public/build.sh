#!/bin/bash

npx tsc
npx stylus src/*.styl --out public/
npx postcss public/*.css --use autoprefixer -d public/