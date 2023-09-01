import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const tag = await this.prisma.tag.create({ data: createTagDto });
    return tag;
  }

  async findAll() {
    return await this.prisma.tag.findMany();
  }

  async findOne(id: number) {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
    return tag;
  }

  async remove(id: number) {
    const tag = await this.prisma.tag.delete({ where: { id } });
    return tag;
  }

  async findTasks(id: number) {
    const tag = await this.prisma.tag.findMany({
      where: { id },
      include: { tasks: true },
    });
    return tag;
  }
}
