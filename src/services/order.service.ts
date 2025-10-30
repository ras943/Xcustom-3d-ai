import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart.service';

export enum OrderStatus {
  PLACED = 'Order Placed',
  DESIGN_REVIEW = 'AI Design Review',
  PRINTING = 'Printing in Progress',
  QUALITY_CHECK = 'Quality Assurance Check',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered'
}

export interface OrderStatusUpdate {
  status: OrderStatus;
  timestamp: Date;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shippingDetails: any;
  paymentMethod: string;
  statusHistory: OrderStatusUpdate[];
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly STORAGE_KEY = 'faisal3dprint_orders';

  createOrder(items: CartItem[], total: number, shippingDetails: any, paymentMethod: string): Order {
    const orderId = `X3D-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newOrder: Order = {
      id: orderId,
      items,
      total,
      shippingDetails,
      paymentMethod,
      createdAt: new Date(),
      statusHistory: [
        { status: OrderStatus.PLACED, timestamp: new Date() }
      ]
    };

    this.saveOrder(newOrder);
    return newOrder;
  }

  getOrder(orderId: string): Order | null {
    if (typeof localStorage === 'undefined') return null;
    const orders = this.getAllOrders();
    return orders.find(o => o.id === orderId) || null;
  }

  private saveOrder(order: Order): void {
    if (typeof localStorage === 'undefined') return;
    const orders = this.getAllOrders();
    orders.push(order);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
  }
  
  private getAllOrders(): Order[] {
    if (typeof localStorage === 'undefined') return [];
    const storedOrders = localStorage.getItem(this.STORAGE_KEY);
    return storedOrders ? JSON.parse(storedOrders) : [];
  }
}
