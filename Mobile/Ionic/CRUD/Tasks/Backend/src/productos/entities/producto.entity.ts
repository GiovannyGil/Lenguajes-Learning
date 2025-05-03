import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Productos {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;
    
    @Column()
    descripcion: string;
    
    @Column('decimal')
    precio: number;
    
    @Column('int')
    stock: number;
}
