FROM        ubuntu:14.04
RUN         apt-get update && apt-get install redis-server -y
EXPOSE      6379
ENTRYPOINT  ["/usr/bin/redis-server"]
