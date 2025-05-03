import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;
    
    @IsNotEmpty()
    @IsNumber()
    precio: number;


    @IsNotEmpty()
    @IsNumber()
    stock: number;
}
