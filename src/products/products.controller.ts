import { Controller, Get, Param, Delete, Body, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }
  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }
  @Delete('/:id')
  public deleteById(@Param('id') id: string) {
    this.productsService.deleteById(id);
    return { success: true }
  }
  @Post('/')
  public create(@Body() productData: Omit<Product, 'id'>) {
    return this.productsService.create(productData);
  }

}
