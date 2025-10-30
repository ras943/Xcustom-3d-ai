

import { Component, input, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem } from '../../services/cart.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // Keep as string for display, convert to number for cart service
  image: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCartEvent = output<Omit<CartItem, 'quantity'>>();
  private router = inject(Router);

  onAddToCart(): void {
    const productData = this.product();
    // Convert price string to number for cart service
    const priceAsNumber = parseInt(productData.price.replace(/[^0-9]/g, ''));
    this.addToCartEvent.emit({
      id: productData.id,
      name: productData.name,
      price: priceAsNumber,
      image: productData.image,
    });
  }

  onViewDetails(): void {
    this.router.navigate(['/product', this.product().id]);
  }
}
