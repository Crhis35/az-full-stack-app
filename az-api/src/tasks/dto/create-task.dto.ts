import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Task } from '../../entities/task.entity';
import { CoreOutput } from '../../common/dto/output.dto';

@InputType()
export class CreateTaskInput extends PickType(Task, ['description']) {}

@ObjectType()
export class CreateTaskOutput extends CoreOutput {
  @Field(() => Task, { nullable: true })
  item?: Task;
}
