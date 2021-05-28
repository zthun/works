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
