#! /usr/bin/env sh

docker run \
    -it --rm \
    -v $(pwd):/usr/app \
    --user pptruser:pptruser \
    --cap-add=SYS_ADMIN \
    vr-puppet:latest \
    sh