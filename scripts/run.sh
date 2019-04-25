#! /usr/bin/env sh

docker run \
    -it --rm \
    -v $(pwd)/screenshots:/usr/app/screenshots \
    -v $(pwd)/config:/usr/app/config:ro \
    --user pptruser:pptruser \
    --cap-add=SYS_ADMIN \
    vr-puppet:latest