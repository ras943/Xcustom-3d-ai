import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomOrderModalComponent } from './components/custom-order-modal/custom-order-modal.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { CartService, CartItem } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CustomOrderModalComponent,
    CartModalComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isCustomOrderModalOpen = signal(false);
  isCartModalOpen = signal(false);
  customOrderDescription = signal<string | null>(null);

  constructor(public cartService: CartService) {}

  onAddToCart(product: Omit<CartItem, 'quantity'>): void {
    this.cartService.addToCart(product);
    // Consider a less intrusive notification like a toast message
  }

  openCustomOrderModal(description: string | null = null): void {
    this.customOrderDescription.set(description);
    this.isCustomOrderModalOpen.set(true);
  }

  closeCustomOrderModal(): void {
    this.isCustomOrderModalOpen.set(false);
    this.customOrderDescription.set(null); // Clear description on close
  }

  handleCustomOrderSubmit(formData: any): void {
    console.log('Custom order submitted:', formData);
    alert('Thank you for your custom order request! We will contact you shortly with a quote.');
    this.closeCustomOrderModal();
  }

  openCartModal(): void {
    this.isCartModalOpen.set(true);
  }

  closeCartModal(): void {
    this.isCartModalOpen.set(false);
  }

  handleUpdateCartQuantity(event: { productId: number; change: number }): void {
    this.cartService.updateQuantity(event.productId, event.change);
  }

  handleRemoveCartItem(productId: number): void {
    this.cartService.removeItem(productId);
  }
}
