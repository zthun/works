# Description

This is the most basic api application that can act as an api for any zthunworks application that doesn't need anything
more than the basic calls.

## Usage

The server is meant to be ran in a docker container.

```sh
docker run @zthun/works-api -p 3000:3000
```

You can run the server locally if you want, but setup is dependant on your environment. It is more recommended to
install it a local docker swarm or kubernetes cluster for a local run.

```sh
npm install -g @zthun/works-api
zthun-works-api
```
