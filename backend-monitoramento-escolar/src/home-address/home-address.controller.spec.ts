import { Test, TestingModule } from '@nestjs/testing';

import { HomeAddressController } from './home-address.controller';
import { HomeAddressService } from './home-address.service';

const homeAddressServiceMock = {};

describe('HomeAddressController', () => {
  let controller: HomeAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeAddressController],
      providers: [
        {
          provide: HomeAddressService,
          useValue: homeAddressServiceMock,
        },
      ],
    }).compile();

    controller = module.get<HomeAddressController>(HomeAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
