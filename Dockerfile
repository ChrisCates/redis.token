FROM        ubuntu:14.04
RUN         apt-get update
RUN         apt-get install redis-server nodejs nodejs-legacy npm -y
RUN         mkdir -p /usr/src/app
WORKDIR     /
RUN         npm install -g mocha
RUN         npm install
EXPOSE      6379
ENTRYPOINT  ["/usr/bin/redis-server"]
