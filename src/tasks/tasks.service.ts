import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.create({ data: createTaskDto });
    return task;
  }

  async findAll() {
    return await this.prisma.task.findMany({ include: { tags: true } });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
    return task;
  }

  async remove(id: number) {
    const task = await this.prisma.task.delete({ where: { id } });
    return task;
  }

  async assignTag(taskId: number, tagId: number) {
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: { tags: { connect: { id: tagId } } },
    });
    return task;
  }

  async removeTag(taskId: number, tagId: number) {
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: { tags: { disconnect: { id: tagId } } },
    });
    return task;
  }

  async complete(id: number) {
    const task = await this.prisma.task.update({
      where: { id },
      data: { isActive: false },
    });
    return task;
  }

  async activate(id: number) {
    const task = await this.prisma.task.update({
      where: { id },
      data: { isActive: true },
    });
    return task;
  }

  async completeAll() {
    const tasks = await this.prisma.task.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });
    return tasks;
  }

  async clearCompleted() {
    const tasks = await this.prisma.task.deleteMany({
      where: { isActive: false },
    });
    return tasks;
  }

  async findCompleted() {
    const tasks = await this.prisma.task.findMany({
      where: { isActive: false },
    });
    return tasks;
  }

  async findActive() {
    const tasks = await this.prisma.task.findMany({
      where: { isActive: true },
    });
    return tasks;
  }

  async deleteCompleted() {
    const tasks = await this.prisma.task.deleteMany({
      where: { isActive: false },
    });
    return tasks;
  }

  async findByName(name: string) {
    const tasks = await this.prisma.task.findMany({
      where: { name: { contains: name } },
    });
    return tasks;
  }
}
