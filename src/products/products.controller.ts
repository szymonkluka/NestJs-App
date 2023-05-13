import { Controller, Get, Param, Delete, Body, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }
  @Get('/:id')
  public getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.getById(id);
  }
  @Delete('/:id')
  public deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    this.productsService.deleteById(id);
    return { success: true }
  }
  @Post('/')
  public create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

}
