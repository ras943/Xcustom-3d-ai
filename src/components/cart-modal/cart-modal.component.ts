
import { Component, input, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './cart-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartModalComponent {
  isOpen = input.required<boolean>();
  cartItems = input.required<CartItem[]>();
  cartTotal = input.required<number>();

  closeModal = output<void>();
  updateQuantity = output<{ productId: number; change: number }>();
  removeItem = output<number>();

  private router = inject(Router);

  onClose(): void {
    this.closeModal.emit();
  }

  onUpdateQuantity(productId: number, change: number): void {
    this.updateQuantity.emit({ productId, change });
  }

  onRemoveItem(productId: number): void {
    this.removeItem.emit(productId);
  }

  onProceedToCheckout(): void {
    this.router.navigate(['/checkout']);
    this.onClose(); // Close modal after action
  }
}
