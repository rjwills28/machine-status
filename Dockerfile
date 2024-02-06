FROM node:20.10.0-alpine

ENV NODE_OPTIONS=--openssl-legacy-provider
RUN adduser -D machine-status
RUN mkdir /machine-status
RUN chown machine-status:machine-status /machine-status
WORKDIR /machine-status
COPY machine-status/build/ /machine-status//build/

USER machine-status

RUN npm install serve

CMD npx serve -s build
