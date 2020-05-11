import { Repository, EntityRepository } from "typeorm";
import { Tema } from "./tema.entity";
import { TemaDto } from "./dto/TemaDto";
import { FiltroDto } from "./dto/FiltroDto"

@EntityRepository(Tema)
export class TemasRepository extends Repository<Tema> {
    async crearTema(temaDto: TemaDto): Promise<Tema> {
        const { nombre } = temaDto
    
        const tema = new Tema()
        tema.nombre = nombre   
        await tema.save()

        return tema
    }    

    async obtenerTemas(filtroDto: FiltroDto): Promise<Tema[]> {
        const { nombre, ordenar } = filtroDto
        const query = this.createQueryBuilder('tema')

        if (nombre) {
            query.andWhere('tema.nombre LIKE :nombre', { nombre: `%${nombre}%` })
        }
        
        if (ordenar && ordenar.toLocaleLowerCase() == 'desc') {
            query.orderBy('tema.nombre', 'DESC')
        }
        else {
            query.orderBy('tema.nombre', 'ASC')
        }
        
        return query.getMany()        
    }
}