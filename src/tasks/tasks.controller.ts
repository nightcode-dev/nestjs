import { Controller, Get, Param } from '@nestjs/common';
import { Tasks } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get(':id')
  getTaskByID(@Param('id') id: string): Promise<Tasks> {
    return this.taskService.getTaskById(id);
  }
}
