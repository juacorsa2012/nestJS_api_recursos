import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique} from "typeorm";

@Entity("temas")
@Unique(['nombre'])
export class Tema extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 40, nullable: false })
    nombre: string;
}