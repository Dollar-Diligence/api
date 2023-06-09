import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LogInDto } from './dto/log-in.dto';
import { User } from 'src/decorators/user.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() dto: RegisterDto) {
    try {
      return this.authService.create(dto);
    } catch (e) {
      throw e;
    }
  }

  @Post('/login')
  login(@Body() dto: LogInDto) {
    try {
      return this.authService.login(dto);
    } catch (e) {
      throw e;
    }
  }

  @Get('')
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @Roles('admin')
  async findAll(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
    @Query('sort') sort: string,
    @User() user,
  ) {
    const options = {
      limit: limit ? +limit : 10,
      skip: skip ? +skip : 0,
      sort: sort ? sort : `{ "createdAt": -1 }`,
    };
    return this.authService.findAll(user, options);
  }
}
