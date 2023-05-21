import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) { }

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({ include: { product: true, client: true } });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true, client: true },
    });
  }

  public deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async create(orderData: CreateOrderDTO): Promise<Order> {
    const { productId, clientId, address } = orderData;
    try {
      const createdOrder = await this.prismaService.order.create({
        data: {
          address,
          product: { connect: { id: productId } },
          client: { connect: { id: clientId } },
        } as any,
        include: { product: true },
      });

      return createdOrder;
    } catch (error) {
      if (error.code === 'P202' || error.message === 'product does not exist') {
        throw new BadRequestException('Product does not exist');
      }
      throw error;
    }
  }

  public updateById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const { productId, ...otherData } = orderData;
    const data: Prisma.OrderUpdateInput = {
      ...otherData,
      product: { connect: { id: productId } },
      client: { connect: { id: otherData.clientId } }, // Include the client field with the correct property name
    };

    return this.prismaService.order.update({
      where: { id },
      data,
      include: { product: true },
    });
  }
}