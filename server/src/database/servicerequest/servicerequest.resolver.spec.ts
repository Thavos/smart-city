import { Test, TestingModule } from '@nestjs/testing';
import { ServicerequestResolver } from './servicerequest.resolver';
import { ServicerequestService } from './servicerequest.service';

describe('ServicerequestResolver', () => {
  let resolver: ServicerequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicerequestResolver, ServicerequestService],
    }).compile();

    resolver = module.get<ServicerequestResolver>(ServicerequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
