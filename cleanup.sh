#!/bin/bash

# Get all container IDs that use an image named 'book_library_api'
container_ids_api=$(docker ps -a -q --filter ancestor=book_library_api)
container_ids_mongo=$(docker ps -a -q --filter name=book_library)

# If there are any such containers, stop them
if [ -n "$container_ids_api" ]; then
  docker stop $container_ids_api
fi

if [ -n "$container_ids_mongo" ]; then
  docker stop $container_ids_mongo
fi

# Remove the containers
if [ -n "$container_ids_api" ]; then
  docker rm $container_ids_api
fi

if [ -n "$container_ids_mongo" ]; then
  docker rm $container_ids_mongo
fi

# Remove the image named 'book_library_api'
docker rmi $(docker images -q book_library_api)

# Remove the contents of the ./mongodb/data directory
rm -rf ./mongodb/data/*
