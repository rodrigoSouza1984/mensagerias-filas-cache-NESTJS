import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBullDto } from './create-user-bull.dto';

export class UpdateUserBullDto extends PartialType(CreateUserBullDto) {}
