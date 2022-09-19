import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './DTO/create-tasks.dto';
import { FilterTasksDto } from './DTO/filter-tasks.dto';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Tasks } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Tasks) private taskRepo: Repository<Tasks>) {}

  async getTasks(filterTasksDto: FilterTasksDto, user: User): Promise<Tasks[]> {
    const { status, title } = filterTasksDto;
    const query = this.taskRepo.createQueryBuilder('tasks');
    query.where({ user });
    if (status) {
      query.andWhere('tasks.status = :status', { status });
    }

    if (title) {
      query.andWhere('LOWER(tasks.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }

    const tasks = await query.getMany();
    return tasks;
  }
  async getTaskById(id: string, user: User): Promise<Tasks> {
    const found = await this.taskRepo.findOne({
      where: {
        id,
        user,
      },
    });
    if (!found) {
      throw new NotFoundException(
        `are you sure?i cant found any task with ${id} id.`,
      );
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Tasks> {
    const { title, description } = createTaskDto;
    const task = this.taskRepo.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.taskRepo.save(task);

    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepo.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(
        `are you sure?i cant found any task with ${id} id.`,
      );
    }
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Tasks> {
    const { status } = updateTaskDto;
    var obj = await this.getTaskById(id, user);
    obj.status = status;
    await this.taskRepo.save(obj);
    return obj;
  }
}
