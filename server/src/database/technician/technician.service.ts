import { Injectable } from '@nestjs/common';
import {
  CreateTechnicianInput,
  UpdateTechnicianInput,
} from 'src/types/graphql';

@Injectable()
export class TechnicianService {
  create(createTechnicianInput: CreateTechnicianInput) {
    return 'This action adds a new technician';
  }

  findAll() {
    return `This action returns all technician`;
  }

  findOne(id: string) {
    return `This action returns a #${id} technician`;
  }

  update(id: string, updateTechnicianInput: UpdateTechnicianInput) {
    return `This action updates a #${id} technician`;
  }

  remove(id: string) {
    return `This action removes a #${id} technician`;
  }
}
