import { Test, TestingModule } from '@nestjs/testing';
import { ServicerequestService } from './servicerequest.service';

describe('ServicerequestService', () => {
  let service: ServicerequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicerequestService],
    }).compile();

    service = module.get<ServicerequestService>(ServicerequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
