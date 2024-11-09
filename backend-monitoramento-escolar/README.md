<img src="//www.plantuml.com/plantuml/png/hLHDRnGn3BtFhuZsYDGAhdEXLIl4IWXLK4u8eNJYxaRa8yGErOBux-nCFDjaDP6gNUOoZlESl6SxlaAIaP8r7RXanHU4UByB8FvqOlz9PRMRh20ZE9fC5VKlY9EP709rVxiSV0VHQaJjtHnkZ7y2bQCqbii0JcctoLim6Er07Gxwu0T9shk2IT33ZnJuVX_yu-E87en4d4WpREr8w7p3Puhx2mHOgKtf2FkG9nzBqDTl8coz0onnJbeerqOYVMJVSvve5xBdLXBSQmjYYB0trJNLxXGKkm-yxwQSrindCo74jJhrvFVUmhLI4H2RYK6A07JOTCa-G2m1WwPT7I09IiTl7MwyogvtnaiIHfAcLBkyssGVtyIjTBguswd_chg2EQ8vo4gMzGhC8NO7zUxWZO-7NGH9-9zgShFLHZLPDxkjElP1HzhU7kdRHBcKNNQyvVUwFh_uBwtqgHdw13yJOFqWchfOLk4OnWJpkXX58_E4PrLjdaVrOrgy-8NPcKyyOuPCKs_rPYKkBiJgzUNbtkANqNDkbY0yS_fveFEQGUDl2fhtluyzNu7oIQzMtCzzLX_1BQAgITIBxVDg6JwtG3zRNNd0Z5tGaQKlw1W5y6v3W4JK6mVgXeNKw3Qp7D_cn80ndZ4B9M9CJQpkkVx8KSMqwV6_JR22DFWjGQh2TpMtDkuAd4hM_0C0" alt="Diagrama de classes" width="100%">

```c#
@startuml

enum UserType {
    admin
    parent
    driver
    unset
}

enum Permission {
    allowed
    disallowed
    pending
    declined
}

enum LocationType {
    pickup
    dropoff
}

class User {
    Int id
    String email
    String password
    String[] phones
    String name
    String lastName
    UserType type
    DateTime createdAt
    DateTime updatedAt
}

class Parent {
    Int id
    Int userId
    DateTime createdAt
    DateTime updatedAt
}

class HomeAddress {
    Int id
    String street
    Int number
    String city
    String state
    String zipCode
    Float latitude
    Float longitude
    Int parentId
    DateTime createdAt
    DateTime updatedAt
}

class Driver {
    Int id
    String plate
    String car
    String model
    Int year
    String color
    Int seats
    Int userId
    DateTime createdAt
    DateTime updatedAt
}

class Child {
    Int id
    String name
    String lastName
    DateTime birthDate
    String grade
    Int parentId
    Int? driverId
    String street
    Int number
    String city
    String state
    Float latitude
    Float longitude
    DateTime createdAt
    DateTime updatedAt
}

class Request {
    Int id
    Int parentId
    Int driverId
    Int childId
    Permission status
    DateTime createdAt
    DateTime updatedAt
}

class ChildLocations {
    Int id
    Int childId
    Float latitude
    Float longitude
    LocationType type
    DateTime createdAt
    DateTime updatedAt
}

User "1" -- "0..1" Driver : driver
User "1" -- "0..1" Parent : parent
Parent "1" -- "1" User : parent_user
Parent "1" -- "0..*" Child : children
Parent "1" -- "0..*" HomeAddress : homeAddress
Parent "1" -- "0..*" Request : Request
HomeAddress "1" -- "1" Parent : parent
Driver "1" -- "1" User : user
Driver "1" -- "0..*" Child : assignedChildren
Driver "1" -- "0..*" Request : Request
Child "1" -- "1" Parent : parent
Child "0..1" -- "1" Driver : driver
Child "1" -- "0..*" ChildLocations : ChildLocations
Child "1" -- "0..*" Request : Request
Request "1" -- "1" Parent : parent
Request "1" -- "1" Driver : driver
Request "1" -- "1" Child : child
ChildLocations "1" -- "1" Child : child

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
