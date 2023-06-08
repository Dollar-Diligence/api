import { HttpException, Injectable } from '@nestjs/common';

import { auth } from 'src/lib/admin';
import { Collection } from 'mongodb';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Injectable()
export class RolesService {
  collection: Collection;

  constructor(private readonly dbService: MongodbService) {
    this.collection = this.dbService.getCollection('roles');
  }

  async addRole(uid: string, role: string) {
    //
    const user = await auth.getUser(uid);
    const currentClaims = user.customClaims;
    if (currentClaims.roles && currentClaims.roles.includes(role)) {
      throw new HttpException(
        {
          message: 'User already has role',
        },
        400,
      );
    }

    const newClaims = {
      ...currentClaims,
      roles: [...(currentClaims.roles || []), role],
    };

    const existing = await this.collection.findOne({ uid, role });

    if (!existing) {
      await this.collection.insertOne({ uid, role });
    }

    await auth.setCustomUserClaims(uid, newClaims);
  }
}
