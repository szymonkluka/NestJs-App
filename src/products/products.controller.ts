import { Controller, Get, Param, Delete, Body, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common'; // add ErrorHttpStatusCode to the import statement
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import * as uuid from 'uuid';

function uuidValidate(uuidToValidate: string): boolean {
  return uuid.validate(uuidToValidate);
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('/')
  getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      if (!uuidValidate(id)) {
        throw new NotFoundException('Invalid UUID provided');
      }
      const product = await this.productsService.getById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  public deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      if (!uuidValidate(id)) {
        throw new NotFoundException('Invalid UUID provided');
      }
      if (!this.productsService.deleteById(id)) {
        throw new NotFoundException('Product not found');
      }
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  public create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');

    this.productsService.updateById(id, productData);
    return { success: true };
  }

}
