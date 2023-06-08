import { HttpException, Injectable } from '@nestjs/common';

import { auth } from 'src/lib/admin';
import { Collection } from 'mongodb';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { isAllowed } from 'src/helpers/roles/isAllowed';

@Injectable()
export class RolesService {
  collection: Collection;

  constructor(private readonly dbService: MongodbService) {
    this.collection = this.dbService.getCollection('roles');
  }

  async addRole(uid: string, role: string) {
    //
    const user = await auth.getUser(uid);
    const currentClaims = user.customClaims || {};

    // check if role is valid
    if (!isAllowed(role)) {
      throw new HttpException(
        {
          message: role, 'is not a valid role': 'valid roles are: admin',
        },
        400,
      );
    }
    if (currentClaims.roles && currentClaims.roles.includes(role)) {
      throw new HttpException(
        {
          message: 'User already has role',
        },
        400,
      );
    }

    // add role to user
    const newClaims = {
      ...currentClaims,
      roles: [...(currentClaims.roles || []), role],
    };

    const existing = await this.collection.findOne({ uid, role });

    if (!existing) {
      await this.collection.insertOne({ uid, role });
    }

    await auth.setCustomUserClaims(uid, newClaims);

    return {
      message: 'Role added',
      newClaims,
    };
  }

  async removeRole(uid: string, role: string) {
    const user = await auth.getUser(uid);
    const currentClaims = user.customClaims || {};

    // check if role is valid
    if (!isAllowed(role)) {
      throw new HttpException(
        {
          message: role, 'is not a valid role': 'valid roles are: admin',
        },
        400,
      );
    }
    if (!currentClaims.roles || !currentClaims.roles.includes(role)) {
      throw new HttpException(
        {
          message: 'User does not have role',
        },
        400,
      );
    }

    // remove role from user
    const newClaims = {
      ...currentClaims,
      roles: currentClaims.roles.filter((r) => r !== role),
    };

    await auth.setCustomUserClaims(uid, newClaims);

    return {
      message: 'Role removed',
      newClaims,
    };
  }

  async fetchRoles(uid: string, role: string) {
    const user = await auth.getUser(uid);
    const currentClaims = user.customClaims || {};

    // check if role is valid
    if (!isAllowed(role)) {
      throw new HttpException(
        {
          message: role, 'is not a valid role': 'valid roles are: admin',
        },
        400,
      );
    }

    return {
      message: 'Role fetched',
      hasRole: currentClaims.roles && currentClaims.roles.includes(role),
    };
  }
}
