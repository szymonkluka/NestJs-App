import { Controller, Get, Param, Delete, Body, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common'; // add ErrorHttpStatusCode to the import statement
import { UpdateProductDTO } from './dtos/update-product.dto';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('/')
  async getAll() {
    return this.productsService.getAll();
  }

  @Get('/extended')
  getAllExtended(): any {
    return this.productsService.getAllExtended();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  @Get('/extended/:id')
  async getExtendedById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getExtendedById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');
    await this.productsService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  public create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');

    await this.productsService.updateById(id, productData);
    return { success: true };
  }

}
