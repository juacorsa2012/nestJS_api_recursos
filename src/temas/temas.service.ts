import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemasRepository } from './temas.repository';
import { Tema } from './tema.entity';
import { TemaDto } from './dto/TemaDto';
import { FiltroDto } from './dto/FiltroDto';

@Injectable()
export class TemasService {
    constructor(@InjectRepository(TemasRepository) private temasRepository: TemasRepository) {}

    async obtenerTema(id: number): Promise<Tema> {
        const tema = await this.temasRepository.findOne(id)

        if (!tema) {
            throw new NotFoundException(`Tema con ${id} no encontrado`)
        }

        return tema
    }

    async obtenerTemas(filtroDto: FiltroDto): Promise<Tema[]> {
        return this.temasRepository.obtenerTemas(filtroDto)
    }

    async crearTema(tema: TemaDto): Promise<void> {
        return this.temasRepository.crearTema(tema)
    }

    async actualizarTema(id: number, temaDto: TemaDto): Promise<Tema> {
        const { nombre } = temaDto
        
        const tema = await this.obtenerTema(id)

        if (!tema) {
            throw new NotFoundException(`Tema con ${id} no encontrado`)
        }

        tema.nombre = nombre 
        await tema.save()

        return tema
    }
}

