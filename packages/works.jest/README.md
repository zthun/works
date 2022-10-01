# Description

This package extends upon jest to add additional methods for mocking. It also adds some common assertions found
throughout @zthun scoped projects.

## Installation

```sh
# NPM
npm install @zthun/works.jest
# Yarn
yarn add @zthun/works.jest
```

## Usage

The most useful feature in this package is going to be the createMocked method which should feel familiar to those who
used jasmine for a long time to do unit tests. It's the equivalent of the jasmine.createSpyObj(...) method.

```ts
import { createMocked } from '@zthun/works.jest';

describe('My object with services.', () => {
  let service: jest.Mocked<IMyService>;

  beforeEach(() => {
    service = createMocked<IMyService>(['get', 'put']);

    service.get.mockReturnValue('You got it.');
  });

  it('should mock the service.', () => {
    // Arrange
    const target = service;
    // Act
    const actual = service.get();
    // Assert
    expect(actual).toEqual('You got it.');
  });
});
```

Most other methods deal with common assertions made throughout @zthun scoped projects, especially those which test
builder objects and getter/setter properties. See the documentation for each individual method to see if any would apply
to your specific requirements.
