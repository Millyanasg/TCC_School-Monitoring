import { ChildDto } from '@backend/parent/dto/ChildDto';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';

import { ChildrenController } from './children.controller';
import { ChildrenService } from './children.service';

const mockChildViewDto: ChildViewDto = {
  id: 0,
  name: 'Test',
  lastName: 'Child',
  birthDate: new Date('2021-01-01'),
  grade: '1',
  street: 'Rua Test',
  number: 0,
  city: 'Rio de Janeiro',
  state: 'RJ',
  latitude: 0,
  longitude: 0,
};

const mockChildDto: ChildDto = {
  name: 'Test',
  lastName: 'Child',
  birthDate: new Date('2021-01-01'),
  grade: '1',
  city: 'Rio de Janeiro',
  latitude: 0,
  longitude: 0,
  number: 0,
  state: 'RJ',
  street: 'Rua Test',
};

const mockParentUser: User = {
  id: 1,
  email: 'user@example.com',
  password: 'password',
  name: 'User',
  lastName: 'Example',
  type: 'parent',
  createdAt: new Date(),
  updatedAt: new Date(),
  phones: ['123456789'],
};

const ChildrenServiceMock = {
  removeChildren: jest.fn(
    (user: User, data: ChildViewDto): Promise<ChildViewDto> => {
      return Promise.resolve(mockChildViewDto);
    },
  ),
  addChildren: jest.fn((user: User, data: ChildDto): Promise<ChildViewDto> => {
    return Promise.resolve(mockChildViewDto);
  }),
  updateChildren: jest.fn(
    (user: User, data: ChildViewDto): Promise<ChildViewDto> => {
      return Promise.resolve(mockChildViewDto);
    },
  ),
  getChildren: jest.fn((user: User): Promise<ChildViewDto[]> => {
    return Promise.resolve([mockChildViewDto]);
  }),
};

describe('ChildrenController', () => {
  let controller: ChildrenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChildrenController],
      providers: [
        {
          provide: ChildrenService,
          useValue: ChildrenServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ChildrenController>(ChildrenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fetch children', async () => {
    const children = await controller.fetchChildren(mockParentUser);
    expect(children).toEqual([mockChildViewDto]);
  });

  it('should add children', async () => {
    const children = await controller.addChildren(
      mockParentUser,
      mockChildViewDto,
    );

    expect(children).toEqual(mockChildViewDto);
  });

  it('should update children', async () => {
    const children = await controller.updateChildren(
      mockParentUser,
      mockChildViewDto,
    );

    expect(children).toEqual(mockChildViewDto);
  });

  it('should remove children', async () => {
    const children = await controller.removeChildren(
      mockParentUser,
      mockChildViewDto,
    );

    expect(children).toEqual(mockChildViewDto);
  });
});
