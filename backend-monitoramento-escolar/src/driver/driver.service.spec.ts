import { PrismaService } from '@backend/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';

import { DriverService } from './driver.service';

const prismaServiceMock = {
  driver: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  user: {
    update: jest.fn(),
  },
};

describe('DriverService', () => {
  let service: DriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
