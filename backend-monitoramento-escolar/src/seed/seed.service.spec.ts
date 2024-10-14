import { Test, TestingModule } from '@nestjs/testing';

import { SeedService } from './seed.service';

const userServiceMock = {};

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: SeedService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
