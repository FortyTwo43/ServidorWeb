import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  console.log(`🚀 GraphQL Server running on http://localhost:${port}/graphql`);
  console.log(`📊 Apollo Sandbox: http://localhost:${port}/graphql`);
}
bootstrap();
