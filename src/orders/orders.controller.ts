import { Controller, Get, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }
  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }
  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.ordersService.getById(id);
  }
  @Delete('/:id')
  public deleteById(@Param('id') id: string) {
    this.ordersService.deleteById(id);
    return { success: true };
  }
}
