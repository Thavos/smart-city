import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRequestResolver } from './servicerequest.resolver';
import { ServiceRequestService } from './servicerequest.service';

describe('ServicerequestResolver', () => {
  let resolver: ServiceRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceRequestResolver, ServiceRequestService],
    }).compile();

    resolver = module.get<ServiceRequestResolver>(ServiceRequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
