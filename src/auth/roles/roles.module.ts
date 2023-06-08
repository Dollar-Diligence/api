import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports: [forwardRef(() => MongodbModule)],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
