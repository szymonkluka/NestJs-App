import { Injectable } from '@nestjs/common';
import { db, Order } from './../db';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders
  }
  public getById(id: number | string): Order | null {
    return db.orders.find((o) => o.id === id) || null;
  }
  public deleteById(id: number | string): Order[] | null {
    const index = db.products.findIndex((o) => o.id === id);
    if (index !== -1) {
      const deletedObject = db.orders.splice(index, 1)[0];
      return [deletedObject];
    }

  }

}
