import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Exception } from '@prisma/client/runtime/library';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task
      .create({ data: createTaskDto })
      .catch((e: Exception) => {
        return e;
      });
    return task;
  }

  async findAll() {
    return await this.prisma.task.findMany({ include: { tags: true } });
  }

  async findOne(id: number) {
    const task = await this.prisma.task
      .findUnique({ where: { id } })
      .catch((e: Exception) => {
        return e;
      });
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task
      .update({
        where: { id },
        data: updateTaskDto,
      })
      .catch((e: Exception) => {
        return e;
      });
    return task;
  }

  async remove(id: number) {
    const task = await this.prisma.task
      .delete({ where: { id } })
      .catch((e: Exception) => {
        return e;
      });
    return task;
  }

  async assignTag(taskId: number, tagId: number) {
    try {
      const task = await this.prisma.task
        .update({
          where: { id: taskId },
          data: { tags: { connect: { id: tagId } } },
        })
        .catch((e: Exception) => {
          return e;
        });
      return task;
    } catch (e) {
      console.log(e);
    }
  }

  async unsignTag(taskId: number, tagId: number) {
    const task = await this.prisma.task
      .update({
        where: { id: taskId },
        data: { tags: { disconnect: { id: tagId } } },
      })
      .catch((e: Exception) => {
        return e;
      });
    return task;
  }

  async complete(id: number) {
    const task = await this.prisma.task
      .update({
        where: { id },
        data: { isActive: false },
      })
      .catch((e: Exception) => {
        return e;
      });
    return task;
  }

  async activate(id: number) {
    const task = await this.prisma.task
      .update({
        where: { id },
        data: { isActive: true },
      })
      .catch((e: Exception) => {
        return e;
      });
    return task;
  }

  async completeAll() {
    const tasks = await this.prisma.task
      .updateMany({
        where: { isActive: true },
        data: { isActive: false },
      })
      .catch((e: Exception) => {
        return e;
      });
    return tasks;
  }

  async clearCompleted() {
    const tasks = await this.prisma.task
      .deleteMany({
        where: { isActive: false },
      })
      .catch((e: Exception) => {
        return e;
      });
    return tasks;
  }

  async findCompleted() {
    const tasks = await this.prisma.task
      .findMany({
        where: { isActive: false },
      })
      .catch((e: Exception) => {
        return e;
      });
    return tasks;
  }

  async findActive() {
    const tasks = await this.prisma.task
      .findMany({
        where: { isActive: true },
      })
      .catch((e: Exception) => {
        return e;
      });
    return tasks;
  }

  async deleteCompleted() {
    const tasks = await this.prisma.task
      .deleteMany({
        where: { isActive: false },
      })
      .catch((e: Exception) => {
        return e;
      });
    return tasks;
  }

  async findByName(name: string) {
    const tasks = await this.prisma.task
      .findMany({
        where: { name: { contains: name } },
      })
      .catch((e: Exception) => {
        return e;
      });
    return tasks;
  }
}
