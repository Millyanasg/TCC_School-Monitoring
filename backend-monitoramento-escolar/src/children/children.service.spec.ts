import { PrismaService } from '@backend/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';

import { ChildrenService } from './children.service';

const prismaServiceMock = {};

describe('ChildrenService', () => {
  let service: ChildrenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChildrenService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<ChildrenService>(ChildrenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
