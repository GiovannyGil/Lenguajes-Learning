import { Inject, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Productos } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Productos)
    private productoRepository: Repository<Productos>
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Productos> {
    try {
      const newProduct = await this.productoRepository.save(createProductoDto);
      
      if(!newProduct) throw new Error('No se pudo crear el producto');

      return newProduct;
    } catch (error) {
      throw new Error('No se pudo crear el producto');
    }
  }

  async findAll() {
    try {
      const products = await this.productoRepository.find();

      if(!products) throw new Error('No se encontraron productos');

      return products
      
    } catch (error) {
      throw new Error('No se encontraron productos');
    }
  }

  async findOne(id: number) {
    try {
      const producto = await this.productoRepository.findOneBy({ id });

      if(!producto) throw new Error('No se encontró el producto');

      return producto;
    } catch (error) {
      throw new Error('No se encontró el producto');
    }

  }

  async findByName(nombre: string) {
    try {
      const ProductName = await this.productoRepository.findOneBy({ nombre });

      if(!ProductName) throw new Error('No se encontró el producto');

      return ProductName;
    } catch (error) {
      throw new Error('No se encontró el producto');
    }
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    try {
      const updatedProduct = await this.productoRepository.update(id, updateProductoDto);

      if(!updatedProduct || updatedProduct.affected === 0) throw new Error('No se pudo actualizar el producto');

      return updatedProduct;
    } catch (error) {
      throw new Error('No se pudo actualizar el producto');
    }
  }

  async remove(id: number) {
    try {
      const deletedProduct = await this.productoRepository.delete(id);

      if(!deletedProduct) throw new Error('No se pudo eliminar el producto');

      return deletedProduct;
    } catch (error) {
      throw new Error('No se pudo eliminar el producto');
    }
  }
}
