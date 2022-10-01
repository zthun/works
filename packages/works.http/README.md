# Description

A library that includes a real and a mockable http service to assist with testing and rest invocations.

## Installation

```sh
# NPM
npm install @zthun/works.http
# Yarn
yarn add @zthun/works.http
```

### Usage

```ts
import { ZRequestBuilder, ZHttpService } from '@zthun/works.url';

function getImage(): string[] {
  const service: IZHttpService = new ZHttpService();
  const request = new ZRequestBuilder();

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
    new ZUrlBuilder().parse('https://zthunworks.com/#/login').subdomain('coffee').build()
  ];
}
```
