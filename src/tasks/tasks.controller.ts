import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-tasks.dto';
import { UpdateTaskDto } from './DTO/update-task.dto';
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

  @Patch('status/:id')
  editTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Tasks> {
    return this.taskService.updateTask(id, updateTaskDto);
  }
}
