import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class MongodbService {
  constructor(@Inject('MongoDbConnection') private readonly db: Db) {}

  async insertOne(col: string, document: object) {
    return this.db.collection(col).insertOne(document);
  }

  getCollection<T = any>(col: string) {
    return this.db.collection<T>(col);
  }

  async find<T>(col: string, query: object): Promise<T[]> {
    return this.db.collection(col).find(query).toArray() as Promise<T[]>;
  }

  async findOne<T>(col: string, query: object): Promise<T> {
    return this.db.collection(col).findOne(query) as Promise<T>;
  }

  async insertMany(col: string, documents: object[]) {
    return this.db.collection(col).insertMany(documents);
  }

  getDb() {
    return this.db;
  }
}
