import { Test, TestingModule } from '@nestjs/testing';
import { TemasService } from './temas.service';
import { TemasRepository } from './temas.repository';
import { FiltroDto } from './dto/FiltroDto';
import { NotFoundException } from '@nestjs/common';
import { TemaDto } from './dto/TemaDto';
import { Tema } from './tema.entity';

const mockTemasRepository = () => ({
  obtenerTemas: jest.fn(),
  findOne: jest.fn(),
  crearTema: jest.fn(),
  actualizarTema: jest.fn()
})

describe('TemasService', () => {
  let temasService;
  let temasRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemasService,
        { provide: TemasRepository, useFactory: mockTemasRepository }
      ],
    }).compile();

    temasService = module.get<TemasService>(TemasService);
    temasRepository = module.get<TemasRepository>(TemasRepository);
  });

  describe('Obtener Temas', () => {
    it('debe devolver los temas del repositorio', async () => {  
      temasRepository.obtenerTemas.mockResolvedValue('temas')

      const filtro: FiltroDto = { nombre: 'test', ordenar: 'asc' }
      const result = await temasService.obtenerTemas(filtro)
      
      expect(temasRepository.obtenerTemas).toHaveBeenCalled()
      expect(result).toEqual('temas')
    })
  })

  describe('Obtener Tema', () => {
    it('debe llamar a findOne de temasRepository y devolver un tema', async () => {
      const mockTema = { nombre: 'Test tema' }
      const id = 1
      temasRepository.findOne.mockResolvedValue(mockTema)

      const result = await temasService.obtenerTema(id)
      expect(result).toEqual(mockTema)

      expect(temasRepository.findOne).toHaveBeenCalledWith(id)
    })

    it('debe devolver una excepción NotFoundException si el tema no existe', () => {
      temasRepository.findOne.mockResolvedValue(null)
      expect(temasService.obtenerTema(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('Crear Tema', () => {
    it('debe llamar a temasRepository.crearTema y devolver el resultado', async () => {
      temasRepository.crearTema.mockResolvedValue('test')

      expect(temasRepository.crearTema).not.toHaveBeenCalled()
      const temaDto: TemaDto = { nombre: 'Test tema' }
      const result = await temasService.crearTema(temaDto)

      expect(temasRepository.crearTema).toHaveBeenCalledWith(temaDto)
      expect(result).toEqual('test')
    })
  })

  describe('Actualizar Tema', () => {
    it('debe actualizar un tema', async () => {
      const save = jest.fn().mockResolvedValue(true)

      temasService.obtenerTema = jest.fn().mockResolvedValue({ save })

      expect(temasService.obtenerTema).not.toHaveBeenCalled()
      expect(save).not.toHaveBeenCalled()

      const temaDto: TemaDto = { nombre: 'Test tema' }      
      await temasService.actualizarTema(1, temaDto)
      
      expect(temasService.obtenerTema).toHaveBeenCalled()
      expect(save).toHaveBeenCalled()      
    })

    it('debe devolver una excepción NotFoundException si el tema no existe', () => {
      temasRepository.findOne.mockResolvedValue(null)
      expect(temasService.obtenerTema(1)).rejects.toThrow(NotFoundException)
    })
  })
});
