import { Test, TestingModule } from '@nestjs/testing';

import { DriverService } from './driver.service';
import { DriverRequestController } from './driverRequestController.controller';

const driverRequestServiceMock = {};

describe('DriverRequestController', () => {
  let controller: DriverRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverRequestController],
      providers: [
        {
          provide: DriverService,
          useValue: driverRequestServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DriverRequestController>(DriverRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
