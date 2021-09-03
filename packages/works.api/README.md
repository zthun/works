# Description

This is an empty application that only responds to the health and options checks.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Usage

The server is meant to be ran in a docker container.

```sh
docker run -p 3000:3000
```

You can run the server locally if you want, but setup is dependant on your environment.
It is more recommended to install it a local docker swarm or kubernetes cluster for a local run.

```sh
npm install -g @zthun/works.api
zthun-works-api
```
