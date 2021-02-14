# Description

Zthunworks is the main application that contains all components, services, and contracts for @zthun scoped applications.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Installation

Zthunworks is meant to run in a kubernetes cluster. It has some dependencies. If you have not installed these into your cluster yet, you will need to before getting it to run. You will need helm.

### Setup

```sh
kubectl create namespace zthunworks
helm repo add jetstack https://charts.jetstack.io
helm repo add nginx-stable https://helm.nginx.com/stable
helm repo update
```

### Dependencies

```sh
helm install zthunworks-nginx-ingress nginx-stable/nginx-ingress --namespace zthunworks
helm install zthunworks-cert-manager jetstack/cert-manager --namespace zthunworks --set installCRDs=true
```

### Install

```sh
# For new installs
yarn workspace @zthun/works.k8s deploy
# For existing installs
yarn workspace @zthun/works.k8s redeploy
```

## Build and Debug

The actual build is ran through docker. You will need to install docker-desktop in order to run a full local build.

```sh
# OSX
brew cask install docker
```

```powershell
# Windows
choco install docker-desktop
```

```sh
git clone https://github.com/zthun/works.git
cd works
# You must do this once to generate all the necessary typedoc files are required.
yarn build
docker-compose up
```

Once the application is running, you will want to open your hosts file and add the following line

```sh
# Note the host file is /etc/hosts on osx and linux
# On windows it's under C:\windows\system32\drivers\etc\hosts
192.168.0.1 local.zthunworks.com
```

Once you have all the setup done, open up any browser of your choice and enter <https://local.zthunworks.com>.

> If you are using Google Chrome, it will not let you ignore the invalid self signed cert. You must run the application with incognito mode.
