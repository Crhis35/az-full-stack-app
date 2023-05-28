import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
