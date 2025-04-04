import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async create(createBookDto: CreateBookDto) {
    try {
      return { data: await this.prisma.book.create({ data: createBookDto }) };
    } catch (error) {
      throw new InternalServerErrorException('Error creating book');
    }
  }

  async findAll() {
    try {
      return { data: await this.prisma.book.findMany() };
    } catch (error) {
      throw new InternalServerErrorException('Error creating book');
    }
  }

  async findOne(id: number) {
    try {
      return { data: await this.prisma.book.findFirst({ where: { id } }) };
    } catch (error) {
      throw new InternalServerErrorException('Error creating book');
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      return {
        data: await this.prisma.book.update({
          where: { id },
          data: { name: updateBookDto.name },
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException('Error creating book');
    }
  }

  async remove(id: number) {
    try {
      return { data: await this.prisma.book.delete({ where: { id } }) };
    } catch (error) {
      throw new InternalServerErrorException('Error creating book');
    }
  }
}
