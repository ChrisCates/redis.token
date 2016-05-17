FROM        node:6-wheezy
EXPOSE      6379
RUN         mkdir -p /src/app/
WORKDIR     /src/app
COPY        "$HOME"/* /src/app/
RUN         sh launch.sh
ENTRYPOINT  ["/usr/bin/redis-server"]  
