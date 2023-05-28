import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import ormConfig from '../config/mikro-orm.config';
import { Task } from '../entities/task.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig),
    MikroOrmModule.forFeature({
      entities: [Task],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
