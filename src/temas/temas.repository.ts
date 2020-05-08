import { Repository, EntityRepository } from "typeorm";
import { Tema } from "./tema.entity";
import { TemaDto } from "./dto/TemaDto";

@EntityRepository(Tema)
export class TemasRepository extends Repository<Tema> {
    async crearTema(temaDto: TemaDto): Promise<Tema> {
        const { nombre } = temaDto
    
        const tema = new Tema()
        tema.nombre = nombre   
        await tema.save()

        return tema
    }    
}