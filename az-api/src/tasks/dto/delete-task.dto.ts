import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Task } from '../../entities/task.entity';
import { CoreOutput } from '../../common/dto/output.dto';

@InputType()
export class DeleteTaskInput extends PickType(Task, ['id']) {}

@ObjectType()
export class DeleteTaskOutput extends CoreOutput {}
