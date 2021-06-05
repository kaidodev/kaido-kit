#!/bin/zsh

docker run --net=host  -e TZ=Europe/Prague  -v /your-data-dir/data:/data  --name "mailserver"  -h "dev7.kaido.team"  -t analogic/poste.io

