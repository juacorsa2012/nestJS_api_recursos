import { Controller, Get, Param, Post, Put, UsePipes, ValidationPipe, Body, ParseIntPipe } from '@nestjs/common';
import { TemasService } from './temas.service';
import { Tema } from './tema.entity';
import { TemaDto } from './dto/TemaDto';

@Controller('temas')
export class TemasController {
    constructor(private temasService: TemasService) {}

    @Get()
    obtenerTemas(): Promise<Tema[]> {
      return this.temasService.obtenerTemas()
    }

    @Get('/:id')
    obtenerTema(@Param('id', ParseIntPipe ) id: number): Promise<Tema> {
        return this.temasService.obtenerTema(id)
    }

    @Post()    
    @UsePipes(ValidationPipe)
    createTask(@Body() temaDto: TemaDto): Promise<Tema> {
      return this.temasService.crearTema(temaDto)
    }

    @Put('/:id')    
    @UsePipes(ValidationPipe)
    actualizarTema(@Param('id', ParseIntPipe) id: number, @Body() temaDto: TemaDto): Promise<Tema> {
      return this.temasService.actualizarTema(id, temaDto)
    }
}
