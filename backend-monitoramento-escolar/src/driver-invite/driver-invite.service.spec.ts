import { Test, TestingModule } from '@nestjs/testing';
import { DriverInviteService } from './driver-invite.service';

describe('DriverInviteService', () => {
  let service: DriverInviteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverInviteService],
    }).compile();

    service = module.get<DriverInviteService>(DriverInviteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
