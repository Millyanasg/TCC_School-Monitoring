import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { CryptService } from './crypt.service';

describe('CryptService', () => {
  let service: CryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [CryptService],
    }).compile();

    service = module.get<CryptService>(CryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a string', async () => {
    expect(await service.hashPassword('password')).toEqual(expect.any(String));
  });

  it('should return a boolean', async () => {
    expect(await service.comparePassword('password', 'password')).toEqual(
      expect.any(Boolean),
    );
  });
});
