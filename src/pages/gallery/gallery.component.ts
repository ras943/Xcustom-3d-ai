import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = this.productService.products;

  onAddToCart(product: Omit<CartItem, 'quantity'>): void {
    this.cartService.addToCart(product);
    // You could implement a more subtle notification here
    alert(`${product.name} added to cart!`);
  }
}
