import { Test, TestingModule } from '@nestjs/testing';
import { UserBullController } from './user-bull.controller';
import { UserBullService } from './user-bull.service';

describe('UserBullController', () => {
  let controller: UserBullController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBullController],
      providers: [UserBullService],
    }).compile();

    controller = module.get<UserBullController>(UserBullController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
