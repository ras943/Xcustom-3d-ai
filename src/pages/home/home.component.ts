import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  // Show first 4 products as featured
  featuredProducts = computed(() => this.productService.products().slice(0, 4));

  onAddToCart(product: Omit<CartItem, 'quantity'>): void {
    this.cartService.addToCart(product);
    // You could implement a more subtle notification here
    alert(`${product.name} added to cart!`);
  }
}
