# Description

The Zthunworks server contains the main entry point of the server application.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Usage

The server is meant to be ran in a docker container.

```sh
docker run -p 3000:3000 -e DATABASE_URL="mongodb://connection/string/to/database"
```

You can run the server locally if you want, but setup is dependant on your environment.
It is more recommended to install it a local docker swarm or kubernetes cluster for a local run.

```sh
npm install -g @zthun/works.server
# This varies depending on whether or not you are on windows or linux.
export DATABASE_URL="mongodb://connection/string/to/database"
zthun-works-server
```
