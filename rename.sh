#!/usr/bin/env bash
for file in images/*.JPG
do
    git mv "$file" "${file%.JPG}.jpg"
done