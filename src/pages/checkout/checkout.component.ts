import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  selectedPaymentMethod = signal('Card'); // Default payment method

  shippingForm = this.fb.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    phone: ['', Validators.required],
    agreeToTerms: [false, Validators.requiredTrue],
  });

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod.set(method);
  }

  placeOrder(): void {
    if (this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      return;
    }
    
    if (this.cartService.cartItems().length === 0) {
        alert("Your cart is empty!");
        this.router.navigate(['/gallery']);
        return;
    }

    const { agreeToTerms, ...shippingDetails } = this.shippingForm.value;

    const order = this.orderService.createOrder(
      this.cartService.cartItems(),
      this.cartService.cartTotal(),
      shippingDetails,
      this.selectedPaymentMethod()
    );

    this.cartService.clearCart();
    this.router.navigate(['/tracking', order.id]);
  }
}