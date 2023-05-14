import { Injectable, Body } from '@nestjs/common';
import { db, Order } from './../db';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDTO } from './dtos/create-order.dto';


@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders
  }
  public getById(id: number | string): Order | null {
    return db.orders.find((o) => o.id === id) || null;
  }
  public deleteById(id: number | string): Order[] | null {
    const index = db.orders.findIndex((o) => o.id === id);
    if (index !== -1) {
      const deletedObject = db.orders.splice(index, 1)[0];
      return [deletedObject];
    }
  }
  public create(orderData: CreateOrderDTO): Order {
    const { productId, client, address } = orderData;
    const order: Order = {
      id: uuidv4(),
      productId,
      client,
      address,
    };
    db.orders.push(order);
    return order;
  }
  public updateById(id: Order['id'], orderData: Omit<Order, 'id'>): void {
    db.orders = db.orders.map((p) => {
      if (p.id === id) {
        return { ...p, ...orderData };
      }
      return p;
    });
  }
}
