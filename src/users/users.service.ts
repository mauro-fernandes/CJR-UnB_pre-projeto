import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log(`This action adds a new user`);
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (userExists) {
      throw new Error('User already exists');
    }
    const user = await this.prisma.user.create({ data: createUserDto });
    return user;
  }

  async findAll(): Promise<any> {
    console.log(`This action returns all users`);
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<any> {
    console.log(`This action returns a #${id} user`);
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(`This action updates a #${id} user`);
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} user`);
    const user = await this.prisma.user.delete({ where: { id } });
    return user;
  }
}
