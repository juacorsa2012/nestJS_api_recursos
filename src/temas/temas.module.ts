import { Module } from '@nestjs/common';
import { TemasService } from './temas.service';
import { TemasController } from './temas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemasRepository } from './temas.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TemasRepository])],
  providers: [TemasService],
  controllers: [TemasController]  
})
export class TemasModule {}


