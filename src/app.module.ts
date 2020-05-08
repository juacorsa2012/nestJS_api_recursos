import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemasModule } from './temas/temas.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TemasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
