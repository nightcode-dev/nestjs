import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './DTO/create-tasks.dto';
import { FilterTasksDto } from './DTO/filter-tasks.dto';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { Tasks } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterTaskDto: FilterTasksDto): Promise<Tasks[]> {
    return this.taskService.getTasks(filterTaskDto);
  }

  @Get(':id')
  getTaskByID(@Param('id') id: string): Promise<Tasks> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto,@GetUser() user:User): Promise<Tasks> {
    return this.taskService.createTask(createTaskDto,user);
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
