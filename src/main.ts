import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger
  const options = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  document.components.securitySchemes = {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
    }
  };

  document.security = [{bearerAuth: []}];
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
