import { Injectable } from '@nestjs/common';
import { CreateCommentInput, UpdateCommentInput } from 'src/types/graphql';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommentInput: CreateCommentInput) {
    return this.prisma.comment.create({
      data: createCommentInput,
    });
  }

  findAll() {
    return this.prisma.comment.findMany();
  }

  findOne(id: string) {
    return this.prisma.comment.findUnique({
      where: { id: id },
      select: { id: true },
    });
  }

  update(id: string, updateCommentInput: UpdateCommentInput) {
    return this.prisma.comment.update({
      where: { id: id },
      data: updateCommentInput,
    });
  }

  remove(id: string) {
    return this.prisma.comment.delete({
      where: { id: id },
    });
  }
}
