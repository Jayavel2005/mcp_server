# Docker Guide

This project can be run inside a Docker container.

## Build the Docker Image

```bash
docker build -t weather-mcp .
```

## Run the Container

```bash
docker run -p 3000:3000 weather-mcp
```

## View Running Containers

```bash
docker ps
```

## Stop the Container

```bash
docker stop <container-id>
```

Using Docker ensures a consistent environment across different systems.