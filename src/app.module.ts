import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongodbModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
