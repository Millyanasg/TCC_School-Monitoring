import { Test, TestingModule } from '@nestjs/testing';
import { DriverInviteController } from './driver-invite.controller';
import { DriverInviteService } from './driver-invite.service';

const DriverInviteServiceMock = {};

describe('DriverInviteController', () => {
  let controller: DriverInviteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverInviteController],
      providers: [
        {
          provide: DriverInviteService,
          useValue: DriverInviteServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DriverInviteController>(DriverInviteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
