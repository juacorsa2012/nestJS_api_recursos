import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("temas")
export class Tema extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 40, unique: true, nullable: false })
    nombre: string;
}