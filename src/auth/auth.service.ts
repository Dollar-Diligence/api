import { Injectable } from '@nestjs/common';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { LogInDto } from './dto/log-in.dto';
import { RegisterDto } from './dto/register.dto';
import { loginUser } from '../helpers/auth/login';
import { registerUser } from '../helpers/auth/register';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import hasRoles from 'src/helpers/haRoles';

@Injectable()
export class AuthService {
  col = this.db.getCollection('accounts');
  constructor(private readonly db: MongodbService) {}
  create(dto: RegisterDto) {
    return registerUser(dto, this.db);
  }

  login(dto: LogInDto) {
    return loginUser(dto);
  }

  
  async findAll(user: DecodedIdToken, options: { limit: number; skip: number; sort: string }) {
    const isAdmin = hasRoles(user, ['admin']);
    if (!isAdmin) {
      throw new Error('Not allowed');
    }
    let filter = {};

    const LIMIT = options.limit > 100 ? 100 : options.limit;
    const SORT = JSON.parse(options.sort);
    const res = await this.col
      .find(filter)
      .sort(SORT)
      .skip(options.skip)
      .limit(LIMIT)
      .toArray();
    return res;

  }
}
