import { CryptService } from '@backend/crypt/crypt.service';
import { PrismaService } from '@backend/prisma/prisma.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Seed } from '@prisma/client';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
    @Inject(CryptService)
    private readonly cryptService: CryptService,
  ) {}
  private async verifyIfSeeded(type: Seed['type']) {
    const seeded = await this.prismaService.seed.findUnique({
      where: {
        type: type,
      },
    });

    this.logger.log(`Seeded ${type}: ${seeded ? 'found' : 'not found'}`);

    if (seeded) {
      throw new HttpException('Already seeded', HttpStatus.BAD_REQUEST);
    }
  }

  private async markAsSeeded({ type }: { type: Seed['type'] }) {
    return await this.prismaService.seed.create({
      data: {
        type,
      },
    });
  }

  async seedUsers() {
    const total = 4 * 20;
    for (let i = 0; i < total; i++) {
      const name = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email();
      await this.prismaService.user.create({
        data: {
          name,
          lastName,
          email,
          password: await this.cryptService.hashPassword('12345678'),
          type: 'unset',
        },
      });
      this.logger.debug(`User ${name} ${lastName} created`);
    }

    // the first 20 are drivers

    // the second 20 are parents
  }

  async seed() {
    try {
      await this.verifyIfSeeded('COMMON');

      return 'Seeded';
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error seeding',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
