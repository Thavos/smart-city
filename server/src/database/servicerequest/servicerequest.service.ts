import { Injectable } from '@nestjs/common';
import {
  CreateServicerequestInput,
  UpdateServicerequestInput,
} from 'src/types/graphql';

@Injectable()
export class ServicerequestService {
  create(createServicerequestInput: CreateServicerequestInput) {
    return 'This action adds a new servicerequest';
  }

  findAll() {
    return `This action returns all servicerequest`;
  }

  findOne(id: string) {
    return `This action returns a #${id} servicerequest`;
  }

  update(id: string, updateServicerequestInput: UpdateServicerequestInput) {
    return `This action updates a #${id} servicerequest`;
  }

  remove(id: string) {
    return `This action removes a #${id} servicerequest`;
  }
}
