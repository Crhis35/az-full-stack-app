import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { ListTaskInput, ListTaskOutput } from './dto/task-list.dto';
import { CreateTaskInput, CreateTaskOutput } from './dto/create-task.dto';
import { DeleteTaskInput, DeleteTaskOutput } from './dto/delete-task.dto';

@Resolver()
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => ListTaskOutput)
  async listTask(
    @Args('input', { nullable: true }) listTaskInput: ListTaskInput,
  ): Promise<ListTaskOutput> {
    return this.tasksService.listTasks(listTaskInput);
  }

  @Mutation(() => CreateTaskOutput)
  async createTask(
    @Args('input') createUserInput: CreateTaskInput,
  ): Promise<CreateTaskOutput> {
    return this.tasksService.createTask(createUserInput);
  }

  @Mutation(() => DeleteTaskOutput)
  async deleteTask(
    @Args('input') deleteTaskInput: DeleteTaskInput,
  ): Promise<DeleteTaskOutput> {
    return this.tasksService.deleteTask(deleteTaskInput);
  }
}
