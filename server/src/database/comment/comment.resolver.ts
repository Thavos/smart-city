import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput, UpdateCommentInput } from 'src/types/graphql';
import { Roles } from 'src/auth/roles.decorator';

@Resolver('Comment')
@UseGuards(RolesGuard)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation('createComment')
  @Roles('Admin', 'Manager', 'Technician', 'Citizen')
  create(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return this.commentService.create(createCommentInput);
  }

  @Query('comments')
  @Roles('Admin', 'Manager', 'Technician', 'Citizen')
  findAll() {
    return this.commentService.findAll();
  }

  @Query('comment')
  @Roles('Admin', 'Manager', 'Technician', 'Citizen')
  findOne(@Args('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Mutation('updateComment')
  @Roles('Admin', 'Manager')
  update(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation('removeComment')
  @Roles('Admin', 'Manager')
  remove(@Args('id') id: string) {
    return this.commentService.remove(id);
  }
}
