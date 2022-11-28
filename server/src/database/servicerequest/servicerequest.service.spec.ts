import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRequestService } from './servicerequest.service';

describe('ServicerequestService', () => {
  let service: ServiceRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceRequestService],
    }).compile();

    service = module.get<ServiceRequestService>(ServiceRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
