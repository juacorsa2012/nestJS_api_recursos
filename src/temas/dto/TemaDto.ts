import { IsNotEmpty, MaxLength } from 'class-validator';

export class TemaDto {    
  @IsNotEmpty({ message: 'Campo requerido' })    
  @MaxLength(40, { message: 'Campo demasiado largo, como máximo 40 caracteres' })
  nombre: string;  
}