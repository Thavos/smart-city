import { Test, TestingModule } from '@nestjs/testing';
import { TechnicianResolver } from './technician.resolver';
import { TechnicianService } from './technician.service';

describe('TechnicianResolver', () => {
  let resolver: TechnicianResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnicianResolver, TechnicianService],
    }).compile();

    resolver = module.get<TechnicianResolver>(TechnicianResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
