import { Module } from '@nestjs/common';
import { DomainModule } from './domain';

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}