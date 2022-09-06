import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './DTO/create-tasks.dto';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Tasks } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Tasks) private taskRepo: Repository<Tasks>) {}
  async getTaskById(id: string): Promise<Tasks> {
    const found = await this.taskRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new NotFoundException(
        `are you sure?i cant found any task with ${id} id.`,
      );
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const { title, description } = createTaskDto;
    const task = this.taskRepo.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepo.save(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `are you sure?i cant found any task with ${id} id.`,
      );
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Tasks> {
    const { status } = updateTaskDto;
    var obj = await this.getTaskById(id);
    obj.status = status;
    await this.taskRepo.save(obj);
    return obj;
  }
}
