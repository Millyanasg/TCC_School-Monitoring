import { PrismaService } from '@backend/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';

import { HomeAddressService } from './home-address.service';

const prismaServiceMock = {};

describe('HomeAddressService', () => {
  let service: HomeAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeAddressService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<HomeAddressService>(HomeAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
