import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Productos } from './entities/producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto): Promise<Productos> {
    try {
      console.log(createProductoDto)
      const NewProduct = await this.productosService.create(createProductoDto);

      if(!NewProduct) throw new Error('No se pudo crear el producto');

      return NewProduct;
    } catch (error) {
      throw new NotFoundException('No se pudo crear el producto');
    }
  }

  @Get()
  async findAll(): Promise<Productos[]> {
    try {
      const products = await this.productosService.findAll();
      
      if(!products) throw new Error('No se encontraron productos');

      return products;
    } catch (error) {
      throw new NotFoundException('No se encontraron productos')
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Productos> {
    try {
      const product = await this.productosService.findOne(+id);

      if(!product) throw new Error('No se encontró el producto');

      return product;
    } catch (error) {
      throw new NotFoundException('No se encontró el producto');
    }
  }

  @Get('nombre/:nombre')
  async findByName(@Param('nombre') nombre: string): Promise<Productos> {
    try {
      const ProductName = await this.productosService.findByName(nombre);

      return ProductName;
    } catch (error) {
      throw new NotFoundException('No se encontró el producto');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    try {
      const UpdateProduct = await this.productosService.update(+id, updateProductoDto);

      if(!UpdateProduct || UpdateProduct.affected === 0) throw new Error('No se pudo actualizar el producto');

      return UpdateProduct;
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar el producto');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const RemoveProduct = await this.productosService.remove(+id);

      if(!RemoveProduct) throw new Error('No se pudo eliminar el producto');

      return RemoveProduct;
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar el producto');
    } 
  }
}
