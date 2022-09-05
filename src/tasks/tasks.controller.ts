import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-tasks.dto';
import { Tasks } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get(':id')
  getTaskByID(@Param('id') id: string): Promise<Tasks> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
