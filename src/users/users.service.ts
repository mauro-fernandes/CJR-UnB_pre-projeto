import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Exception } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log(`This action adds a new user`);

    const emailExists = await this.prisma.user
      .findUnique({
        where: { email: createUserDto.email },
      })
      .catch((error: Exception) => {
        return { error };
      });
    const usernameExists = await this.prisma.user
      .findUnique({
        where: { username: createUserDto.username },
      })
      .catch((error: Exception) => {
        return { error };
      });
    if (emailExists || usernameExists) {
      return { error: 'User already exists' };
    }

    const user = await this.prisma.user
      .create({ data: createUserDto })
      .catch((error: Exception) => {
        return { error };
      });
    return user;
  }

  async findAll(): Promise<any> {
    console.log(`This action returns all users`);
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<any> {
    console.log(`This action returns a #${id} user`);
    return this.prisma.user
      .findUnique({ where: { id } })
      .catch((error: Exception) => {
        return { error };
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(`This action updates a #${id} user`);
    const user = await this.prisma.user
      .update({
        where: { id },
        data: updateUserDto,
      })
      .catch((error: Exception) => {
        return { error };
      });
    return user;
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} user`);
    const user = await this.prisma.user
      .delete({ where: { id } })
      .catch((error: Exception) => {
        return { error };
      });
    return user;
  }
}
