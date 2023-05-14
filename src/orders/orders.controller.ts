import { Controller, Get, Param, Delete, Post, Body, ParseUUIDPipe, NotFoundException, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const order = this.ordersService.getById(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  public deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const order = this.ordersService.deleteById(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order
    } catch (error) {
      throw error
    }
  }
  @Post('/')
  public create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');

    this.ordersService.updateById(id, orderData);
    return { success: true };
  }

}