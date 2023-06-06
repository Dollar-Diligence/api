import { Module } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import * as dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'MongoDbConnection',
      useFactory: async (): Promise<Db> => {
        const client = await MongoClient.connect(process.env.DB_URL);
        return client.db(process.env.MONGO_DB_NAME || 'development');
      },
    },
    MongodbService,
  ],
})
export class MongodbModule {}
