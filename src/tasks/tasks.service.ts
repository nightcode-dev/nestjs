import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
