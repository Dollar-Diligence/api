import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports: [forwardRef(() => MongodbModule)],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
