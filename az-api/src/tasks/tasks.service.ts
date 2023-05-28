import { Injectable } from '@nestjs/common';
import { ListTaskInput, ListTaskOutput } from './dto/task-list.dto';
import { Task } from '../entities/task.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateTaskInput, CreateTaskOutput } from './dto/create-task.dto';
import { DeleteTaskInput, DeleteTaskOutput } from './dto/delete-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    readonly taskRepository: EntityRepository<Task>,
    private readonly em: EntityManager,
  ) {}
  async listTasks({ offset, limit }: ListTaskInput): Promise<ListTaskOutput> {
    try {
      const [items, count] = await this.taskRepository.findAndCount(
        {},
        { offset, limit },
      );

      return {
        ok: true,
        items,
        totalPages: Math.ceil(count / limit),
        totalResults: count,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async createTask(input: CreateTaskInput): Promise<CreateTaskOutput> {
    try {
      const item = this.taskRepository.create(input);
      await this.em.persistAndFlush(item);
      return {
        ok: true,
        item,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async deleteTask({ id }: DeleteTaskInput): Promise<DeleteTaskOutput> {
    try {
      const item = this.em.getReference(Task, id);
      await this.em.remove(item).flush();

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
