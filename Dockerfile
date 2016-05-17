FROM        ubuntu:14.04
RUN         apt-get update
RUN         apt-get install redis-server nodejs nodejs-legacy npm -y
RUN         npm install redis.token
EXPOSE      6379
ENTRYPOINT  ["/usr/bin/redis-server"]
CMD         ["npm run NYC"]
