import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from 'nestjs-dotenv';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URI],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });
   app.listen();
   console.log("Main microservice started")
}
bootstrap();


