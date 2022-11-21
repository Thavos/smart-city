import { Injectable } from '@nestjs/common';
import { CreateManagerInput, UpdateManagerInput } from 'src/types/graphql';

@Injectable()
export class ManagerService {
  create(createManagerInput: CreateManagerInput) {
    return 'This action adds a new manager';
  }

  findAll() {
    return `This action returns all manager`;
  }

  findOne(id: string) {
    return `This action returns a #${id} manager`;
  }

  update(id: string, updateManagerInput: UpdateManagerInput) {
    return `This action updates a #${id} manager`;
  }

  remove(id: string) {
    return `This action removes a #${id} manager`;
  }
}
