<img src="http://www.plantuml.com/plantuml/png/bP7FIiD048VlUOebbu2IejSYqeDd4OedyJ1cXpQmVyBCH2cjx-wQJbApbK9poUwNRxA_cLsn04dlNT4uO3QlZ6JsXKdFBNfetTAmK1isHzGbvokIdTC07kV40Slp6PLTbqW5rhUXCWTJTK0OP5XQQZ-HgkAxq2HF0nYpT0ua-ri3D0S-Mipoxl1N2ht_GDAgw69MnmZ2apK5U1d2ZG5OUfksoLiVLs_l9tNTR6Dqete-3h2Ma3dB7oFPDe1Wzk7YKOhC_hhHRmWi_krnkEY7GrsFWrwQBV09Q_ivrbOLgrFUbwQk7qrvjrZSb6D4TRJWigCxbORtT128OB3_IlEGgwJrtlq0" alt="Diagrama de classes" width="100%">

```c#
@startuml

class User {
    +email: string
    +password: string
    +name: string
    +lastName: string
    +type: 'admin' | 'parent' | 'driver'
}

class Driver {
    +plate: string
    +car: string
    +model: string
    +year: number
    +color: string
    +seats: number
}

class Parent {
    +students: Student[]
}

class School {
    +name: string
    +address: string
    +coordinates: string
    +students: Student[]
}

class Student {
    +name: string
    +lastName: string
    +grade: number
}

User <|-- Driver : has
User <|-- Parent : has
User <|-- School : has
Parent "1" --> "0..*" Student : has
School "1" --> "0..*" Student : has
Student "1" --> "1" School : attends
Student "1" --> "1" Parent : has

@enduml
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
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

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
