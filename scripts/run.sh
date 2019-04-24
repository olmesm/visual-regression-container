#! /usr/bin/env sh

docker run \
    -it --rm \
    -v $(pwd)/screenshots:/usr/app/screenshots \
    --user pptruser:pptruser \
    --cap-add=SYS_ADMIN \
    vr-puppet:latest