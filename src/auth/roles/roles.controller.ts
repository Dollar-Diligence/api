import { Controller, Get, Param, Post, Query} from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post(':uid')
  @ApiQuery({ name: 'role', required: true })
  async addRole(
    @Param('uid') uid: string,
    @Query('role') role: string,
  ) {
    return await this.rolesService.addRole(uid, role);
  }

  @Post(':uid/remove')
  @ApiQuery({ name: 'role', required: true })
  async removeRole(
    @Param('uid') uid: string,
    @Query('role') role: string,
  ) {
    return await this.rolesService.removeRole(uid, role);
  }

  @Get(':uid/has')
  async fetchRoles(
    @Param('uid') uid: string,
  ) {
    return await this.rolesService.fetchRoles(uid);
  }
}
