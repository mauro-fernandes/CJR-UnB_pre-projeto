import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Exception } from '@prisma/client/runtime/library';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const tag = await this.prisma.tag
      .create({ data: createTagDto })
      .catch((e: Exception) => {
        return e;
      });
    return tag;
  }

  async findAll() {
    return await this.prisma.tag.findMany();
  }

  async findOne(id: number) {
    const tag = await this.prisma.tag
      .findUnique({ where: { id } })
      .catch((e: Exception) => {
        return e;
      });
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.prisma.tag
      .update({
        where: { id },
        data: updateTagDto,
      })
      .catch((e: Exception) => {
        return e;
      });
    return tag;
  }

  async remove(id: number) {
    const tag = await this.prisma.tag
      .delete({ where: { id } })
      .catch((e: Exception) => {
        return e;
      });
    return tag;
  }

  async tasksByTag(id: number) {
    const tag = await this.prisma.tag
      .findMany({
        where: { id },
        include: { tasks: true },
      })
      .catch((e: Exception) => {
        return e;
      });
    return tag;
  }
}
