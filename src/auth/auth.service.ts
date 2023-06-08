import { Injectable } from '@nestjs/common';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { LogInDto } from './dto/log-in.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginUser } from '../helpers/auth/login';
import { registerUser } from '../helpers/auth/register';

@Injectable()
export class AuthService {
  constructor(private readonly db: MongodbService) {}
  create(dto: RegisterDto) {
    return registerUser(dto, this.db);
  }

  login(dto: LogInDto) {
    return loginUser(dto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
