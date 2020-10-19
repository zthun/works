# Description

A very small library that allows you to build a new url or parse an existing url to modify it.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Installation

```sh
# NPM
npm install @zthun/works.url
# Yarn
yarn add @zthun/works.url
```

### Usage

```ts
import { ZUrlBuilder } from '@zthun/works.url';

function createUrls(): string[] {
  // Uses the current location and appends the base api path specified.  The default is
  // api.  Assume we are on https://zthunworks.com/#/home
  return [
    // Create urls from scratch
    // Outputs: ftp://zthunworks.com:3662/path/to/resource/?foo=bar&name=joe/#/home
    new ZUrlBuilder()
      .protocol('ftp')
      .host('zthunworks.com')
      .path('/path/to')
      .append('resource')
      .port(3662)
      .param('foo', 'bar')
      .param('name', 'joe')
      .hash('home')
      .build(),

    // Create urls based on the current browser location.
    // Outputs: https://zthunworks.com/#/home
    new ZUrlBuilder().location().build(),

    // Creates urls based on the location and a base path for your server api
    // Outputs: https://zthunworks.com/api
    new ZUrlBuilder().api().build(),
    // Outputs: https://zthunworks.com/server
    new ZUrlBuilder().api(location, 'server').build(),

    // Parse existing urls and add subdomains to it.
    // https://coffee.zthunworks.com/#/login
    new ZUrlBuilder()
      .parse('https://zthunworks.com/#/login')
      .subdomain('coffee')
      .build()
  ];
}
```
