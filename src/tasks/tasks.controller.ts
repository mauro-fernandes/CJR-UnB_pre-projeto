import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @Post(':taskId/assign_tag/:tagId')
  assignTag(@Param('taskId') taskId: string, @Param('tagId') tagId: string) {
    return this.tasksService.assignTag(+taskId, +tagId);
  }

  @Post(':taskId/unsign_tag/:tagId')
  removeTag(@Param('taskId') taskId: string, @Param('tagId') tagId: string) {
    return this.tasksService.unsignTag(+taskId, +tagId);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string) {
    return this.tasksService.complete(+id);
  }

  @Post(':id/activate')
  activate(@Param('id') id: string) {
    return this.tasksService.activate(+id);
  }

  @Post('complete_all')
  completeAll() {
    return this.tasksService.completeAll();
  }

  @Post('clear_completed')
  clearCompleted() {
    return this.tasksService.clearCompleted();
  }

  @Post('findCompleted')
  findCompleted() {
    return this.tasksService.findCompleted();
  }

  @Post('findActive')
  findActive() {
    return this.tasksService.findActive();
  }

  @Post('deleteCompleted')
  deleteCompleted() {
    return this.tasksService.deleteCompleted();
  }

  @Post('findByName/:name')
  findByName(@Param('name') name: string) {
    return this.tasksService.findByName(name);
  }
}
