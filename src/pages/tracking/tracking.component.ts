import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService, Order, OrderStatus, OrderStatusUpdate } from '../../services/order.service';
import { GenAIService } from '../../services/genai.service';

type ViewState =
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | { status: 'error'; error: string };


@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, NgOptimizedImage],
  templateUrl: './tracking.component.html',
  styles: [`
    .step-item.completed .step-circle {
      background-color: #22d3ee; /* cyan-400 */
      border-color: #22d3ee;
    }
    .step-item.completed .step-line {
       background-color: #22d3ee;
    }
    .step-item.active .step-circle {
       background-color: #0891b2; /* cyan-600 */
       border-color: #22d3ee;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private genAIService = inject(GenAIService);

  order = signal<Order | null>(null);
  aiUpdateState = signal<ViewState>({ status: 'loading' });

  allStatuses = Object.values(OrderStatus);
  
  currentStatus = computed(() => {
    const history = this.order()?.statusHistory;
    return history ? history[history.length - 1] : null;
  });
  
  isStatusCompleted = (status: OrderStatus) => {
    const history = this.order()?.statusHistory;
    return history ? history.findIndex(s => s.status === status) < history.length - 1 : false;
  };

  isStatusActive = (status: OrderStatus) => {
    return this.currentStatus()?.status === status;
  }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      const foundOrder = this.orderService.getOrder(orderId);
      this.order.set(foundOrder);
      if (foundOrder) {
        this.getAiUpdate();
      }
    }
  }

  async getAiUpdate(): Promise<void> {
    const currentOrder = this.order();
    const status = this.currentStatus();
    if (!currentOrder || !status) return;

    this.aiUpdateState.set({ status: 'loading' });
    try {
      const productName = currentOrder.items[0]?.name || 'your custom creation';
      const result = await this.genAIService.generateOrderStatusUpdate(productName, status.status);
      this.aiUpdateState.set({ status: 'success', message: result });
    } catch (error: any) {
      this.aiUpdateState.set({ status: 'error', error: 'Could not get update from Sarah.' });
    }
  }
}