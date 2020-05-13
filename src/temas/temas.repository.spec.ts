import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing'
import {TemasRepository} from './temas.repository'
import { TemaDto } from './dto/TemaDto';
import { FiltroDto } from './dto/FiltroDto';

const mockTemaDto: TemaDto = { nombre: 'tema' }
const mockFiltroDto: FiltroDto = { nombre: '', ordenar: 'ASC' }

describe('TemasRepository', () => {
    let temasRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [TemasRepository],
        }).compile();
    
        temasRepository = await module.get<TemasRepository>(TemasRepository);        
    });

    describe('crearTema', () => {
        let save;

        beforeEach(() => {
            save = jest.fn()
            temasRepository.create = jest.fn().mockReturnValue({ save })
        })

        it('Debe crear un tema correctamente', () => {
            save.mockResolvedValue(undefined)
            expect(temasRepository.crearTema(mockTemaDto)).resolves.not.toThrow()
        })

        it('Debe generar una excepción Conflict si el tema ya existe', () => {
            save.mockResolvedValue({ sqlState: '23000' })
            expect(temasRepository.crearTema(mockTemaDto)).rejects.toThrow(ConflictException)
        })

        it('Debe generar una excepción InternalServerError si no es posible crear un nuevo tema', () => {
            save.mockResolvedValue({ sqlState: '12345' })
            expect(temasRepository.crearTema(mockTemaDto)).rejects.toThrow(InternalServerErrorException)
        })
    })

    describe('Obtener Temas', () => {
        it('debe devolver todos los temas', async () => {  
          temasRepository.obtenerTemas = jest.fn().mockResolvedValue('temas')     
          
          const result = await temasRepository.obtenerTemas(mockFiltroDto)
          
          expect(temasRepository.obtenerTemas).toHaveBeenCalled()         
          expect(result).toEqual('temas')
        })
      })  
})