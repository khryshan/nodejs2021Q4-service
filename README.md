<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running application in docker

This instruction assumes you have a current version of Docker installed on your machine. If you do not have Docker installed, install Docker on your machine.

Choose your preferred operating system link below to download Docker:
- DOCKER - [Download](https://docs.docker.com/get-started/#download-and-install-docker).

For Docker Desktop installation instructions, see [Install Docker Desktop on Mac](https://docs.docker.com/desktop/mac/install/) and  [Install Docker Desktop on Windows](https://docs.docker.com/desktop/windows/install/).

Then open a command prompt or bash window, and run the commands:

- Build components `docker-compose build` (in `nodejs2021Q4-service` directory);

- Run project `docker-compose up`.

After starting, the application is on port 4000 (as default) 

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Metrics for Express & Fastify

### Express

| Name                                                   | Value   |
| ---                                                    |  :---:  |
| errors.ECONNRESET:                                     | 4       |
| errors.ETIMEDOUT:                                      | 157     |
| http.codes.200:                                        | 30      |
| http.codes.201:                                        | 20      |
| http.codes.204:                                        | 8       |
| http.request_rate:                                     | 12/sec  |
| http.requests:                                         | 219     |
| http.response_time:                                    |         |
| min:                                                   | 4       |
| max:                                                   | 9810    |
| median:                                                | 144     |
| p95:                                                   | 9047.6  |
| p99:                                                   | 9230.4  |
| http.responses:                                        | 58      |
| vusers.completed:                                      | 8       |
| vusers.created:                                        | 169     |
| vusers.created_by_name.check out /users entrypoint:    | 169     |
| vusers.failed:                                         | 161     |
| vusers.session_length:                                 |         |
| min:                                                   | 218.3   |
| max:                                                   | 18728.5 |
| median:                                                | 347.3   |
| p95:                                                   | 539.2   |
| p99:                                                   | 539.2   |


### Fastify

| Name                                                   | Value   |
| ---                                                    |  :---:  |
| errors.ECONNRESET:                                     | 5       |
| errors.ETIMEDOUT:                                      | 158     |
| http.codes.200:                                        | 18      |
| http.codes.201:                                        | 15      |
| http.codes.204:                                        | 4       |
| http.request_rate:                                     | 12/sec  |
| http.requests:                                         | 200     |
| http.response_time:                                    |         |
| min:                                                   | 47      |
| max:                                                   | 6393    |
| median:                                                | 539.2   |
| p95:                                                   | 6187.2  |
| p99:                                                   | 6312.2  |
| http.responses:                                        | 37      |
| vusers.completed:                                      | 4       |
| vusers.created:                                        | 167     |
| vusers.created_by_name.check out /users entrypoint:    | 167     |
| vusers.failed:                                         | 163     |
| vusers.session_length:                                 |         |
|   min:                                                 | 1150.7  |
|   max:                                                 | 3088.1  |
|   median:                                              | 1436.8  |
|   p95:                                                 | 1495.5  |
|   p99:                                                 | 1495.5  |


