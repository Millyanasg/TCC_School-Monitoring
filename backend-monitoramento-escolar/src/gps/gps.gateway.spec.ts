import { Test, TestingModule } from '@nestjs/testing';

import { GpsGateway } from './gps.gateway';

describe('GpsGateway', () => {
  let gateway: GpsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpsGateway],
    }).compile();

    gateway = module.get<GpsGateway>(GpsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
