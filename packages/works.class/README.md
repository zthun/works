# Description

Zthunworks class package is an extension for class-validator that contains additional validation decorators.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Installation

```sh
# NPM
npm install class-validator
npm install @zthun/works.class
# Yarn
yarn add class-validator
yarn add @zthun/works.class
```

## Usage

In addition to the validations provided to you by class-validator, you will also receive the following decorators.

| Module                | Description                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| IsDataUriLimit        | Checks the contents of the data uri property and makes sure the actual data portion is limited to a specific size. |
| IsDataUriType         | Checks the mime-type of the data uri to make sure it falls into a list of supported types.                         |
| EqualsOtherProperty   | Checks to make sure that the target property equals another property on the same object.                           |
| RequiresOtherProperty | Checks to make sure that in addition to the target property, another property is defined.                          |
| IsNotWhiteSpace       | Checks to make sure that a string is not pure white space.                                                         |
