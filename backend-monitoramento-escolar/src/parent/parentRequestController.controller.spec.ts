import { ParentRequestController } from './parentRequestController.controller';
import { Test, TestingModule } from '@nestjs/testing';
describe('ParentRequestController', () => {
  let controller: ParentRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParentRequestController],
    }).compile();

    controller = module.get<ParentRequestController>(ParentRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
