
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
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

  // Not implemented in original, but good to have for future
  onViewDetails(): void {
    console.log('View details for:', this.product().name);
    // Potentially navigate to a product detail page
  }
}
