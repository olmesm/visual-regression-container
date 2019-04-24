FROM node:10.15.3-alpine

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
WORKDIR /usr/app

COPY package* ./
RUN npm i

COPY scripts scripts
COPY src src

RUN sh scripts/setup-container.sh

CMD npm start