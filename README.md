Event Sourcing generator for Nestjs
=====
[![npm version](https://badge.fury.io/js/event-sourcing-generator.svg)](https://badge.fury.io/js/event-sourcing-generator)

A CLI for generating classes for CQRS + ES for NestJS.

This cli works for [this](https://github.com/ArkerLabs/event-sourcing-nestjs) event sourcing library.

***Options:***

  -V, --version           output the version number

  -t, --type <type>       [command|event]

  -n, --classname <name>  Name

  -d, --domain <name>     Specify domain name

  -h, --help              output usage information


## Installation
```bash
npm install -g event-sourcing-generator
```

## Usage

### Generate command
```bash
es-generator -t command -d users -n CreateUser
```

### Generate event
```bash
es-generator -t event -d users -n UserCreated
```

## Help
```bash
es-generator -h
```