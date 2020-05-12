import { Controller, Get, Param, Post, Put, UsePipes, ValidationPipe, HttpStatus, 
         Body, ParseIntPipe, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { TemasService } from './temas.service';
import { Tema } from './tema.entity';
import { TemaDto } from './dto/TemaDto';
import { FiltroDto } from './dto/FiltroDto';

@Controller('temas')
export class TemasController {
    constructor(private temasService: TemasService) {}

    @Get()
    async obtenerTemas(@Query() filtroDto: FiltroDto, @Res() res: Response) {
      const temas = await this.temasService.obtenerTemas(filtroDto)
      
      return res.status(HttpStatus.OK).json({
        count: temas.length,
        data: temas
      })
    }

    @Get('/:id')
    obtenerTema(@Param('id', ParseIntPipe ) id: number): Promise<Tema> {
        return this.temasService.obtenerTema(id)
    }

    @Post()    
    @UsePipes(ValidationPipe)
    createTask(@Body() temaDto: TemaDto): Promise<void> {
      return this.temasService.crearTema(temaDto)
    }

    @Put('/:id')    
    @UsePipes(ValidationPipe)
    actualizarTema(@Param('id', ParseIntPipe) id: number, @Body() temaDto: TemaDto): Promise<Tema> {
      return this.temasService.actualizarTema(id, temaDto)
    }
}
