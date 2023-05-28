import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dto/pagination.dto';
import { Task } from '../../entities/task.entity';

@InputType()
export class ListTaskInput extends PaginationInput {}

@ObjectType()
export class ListTaskOutput extends PaginationOutput {
  @Field(() => [Task], { nullable: true })
  items?: Task[];
}
