#! /usr/bin/env sh

sh ./scripts/build.sh

docker run \
    -it --rm \
    -v $(pwd):/usr/app \
    --user pptruser:pptruser \
    --cap-add=SYS_ADMIN \
    vr-puppet:latest \
    sh