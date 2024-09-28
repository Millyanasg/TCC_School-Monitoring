import { UserService } from '@backend/user/user.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor(private readonly userService: UserService) {}
  public async seed() {
    throw new Error('Method not implemented.');
  }

  private getRandomAddress() {
    const country = 'Brazil';
    const state = 'RJ';
    const city = 'Rio de Janeiro';
    const street = `Rua ${faker.location.street()}`;
    const number = Math.floor(Math.random() * 1000);
    const zipCode = faker.location.zipCode();

    const latitude = faker.location.latitude({
      max: -22.0,
      min: -23.0,
      precision: 0.0001,
    });

    const longitude = faker.location.longitude({
      max: -43.0,
      min: -44.0,
      precision: 0.0001,
    });

    return {
      country,
      state,
      city,
      street,
      number,
      zipCode,
      latitude,
      longitude,
    };
  }

  async seedParentUsers() {
    for (let i = 0; i < 100; i++) {
      const user = this.createFakeUser();
      // const address = await this.getRandomAddress();
      // const children = this.createFakeChildren();

      await this.userService.createUser({
        name: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: faker.internet.password(),
        type: 'parent',
      });
    }
  }

  private createFakeChildren() {
    return Array.from({ length: Math.floor(Math.random() * 5) }, () =>
      this.generateFakeStudent(),
    );
  }

  private generateFakeStudent() {
    const grades = [
      'C.A',
      '2º ano',
      '3º ano',
      '4º ano',
      '5º ano',
      '6º ano',
      '7º ano',
      '8º ano',
      '9º ano',
      '1º ano',
      '2º ano',
      '3º ano',
    ];

    const name = faker.person.firstName();
    const lastName = faker.person.lastName();
    const age = Math.floor(Math.random() * 10) + 6; // 6 to 13
    const grade = grades[age - 6];
    const schoolId = Math.floor(Math.random() * 1000);
    const driverId = Math.floor(Math.random() * 1000);
    return { name, lastName, age, grade, schoolId, driverId };
  }

  private createFakeUser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const email = faker.internet
      .email({
        firstName,
        lastName,
      })
      .toLowerCase();

    return { firstName, lastName, email };
  }
}
