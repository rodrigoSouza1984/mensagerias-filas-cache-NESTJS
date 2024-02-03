import { Test, TestingModule } from '@nestjs/testing';
import { UserBullService } from './user-bull.service';

describe('UserBullService', () => {
  let service: UserBullService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBullService],
    }).compile();

    service = module.get<UserBullService>(UserBullService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
