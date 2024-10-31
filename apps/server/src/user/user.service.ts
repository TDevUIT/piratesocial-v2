import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async createManyUsers(data: CreateUserDto[]) {
    return this.prisma.user.createMany({ data });
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async updateUser(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async findOneBy(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async insertOne(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }
}
