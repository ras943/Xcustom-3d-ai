

import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService, CartItem } from '../../services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { GenAIService } from '../../services/genai.service';
import { Review, ReviewService } from '../../services/review.service';
import { ReviewFormComponent } from '../../components/review-form/review-form.component';
import { ReviewListComponent } from '../../components/review-list/review-list.component';

type AiDescriptionState = 
  | { status: 'loading' }
  | { status: 'success'; description: string }
  | { status: 'error' };

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule, 
    NgOptimizedImage, 
    RouterLink, 
    ProductCardComponent,
    ReviewFormComponent,
    ReviewListComponent
  ],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private genAIService = inject(GenAIService);
  private reviewService = inject(ReviewService);

  product = signal<Product | undefined>(undefined);
  aiDescriptionState = signal<AiDescriptionState>({ status: 'loading' });
  reviews = signal<Review[]>([]);

  averageRating = computed(() => {
    const items = this.reviews();
    if (items.length === 0) return 0;
    const total = items.reduce((sum, review) => sum + review.rating, 0);
    return total / items.length;
  });
  
  relatedProducts = computed(() => {
    const currentProduct = this.product();
    if (!currentProduct) return [];
    return this.productService.products()
      .filter(p => p.id !== currentProduct.id)
      .sort(() => 0.5 - Math.random()) // Randomize
      .slice(0, 4);
  });

  ngOnInit(): void {
    // Subscribe to route param changes to handle navigation 
    // from one product detail page to another (e.g., from related products).
    this.route.paramMap.subscribe(params => {
        this.loadProduct(params.get('id'));
    });
  }

  private loadProduct(productId: string | null): void {
     if (productId) {
      const numericId = +productId;
      const foundProduct = this.productService.products().find(p => p.id === numericId);
      this.product.set(foundProduct);
      this.reviews.set(this.reviewService.getReviewsForProduct(numericId));
      
      if (foundProduct) {
        this.generateAiDescription(foundProduct.name, foundProduct.description);
      }

      // Scroll to top when a new product is loaded, for better UX
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    } else {
        this.product.set(undefined);
    }
  }

  private async generateAiDescription(name: string, description: string): Promise<void> {
    this.aiDescriptionState.set({ status: 'loading' });
    try {
      const aiDescription = await this.genAIService.generateProductDescription(name, description);
      this.aiDescriptionState.set({ status: 'success', description: aiDescription });
    } catch {
      this.aiDescriptionState.set({ status: 'error' });
    }
  }

  onAddToCart(): void {
    const p = this.product();
    if (p) {
        const priceAsNumber = parseInt(p.price.replace(/[^0-9]/g, ''));
        const cartItem: Omit<CartItem, 'quantity'> = {
            id: p.id,
            name: p.name,
            price: priceAsNumber,
            image: p.image
        };
        this.cartService.addToCart(cartItem);
        alert(`${p.name} added to cart!`);
    }
  }
  
  handleRelatedAddToCart(product: Omit<CartItem, 'quantity'>): void {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

  onReviewSubmit(reviewData: { rating: number; text: string }): void {
    const currentProduct = this.product();
    if (currentProduct) {
      this.reviewService.addReview(currentProduct.id, reviewData);
      // Refresh reviews from storage to show the new one
      this.reviews.set(this.reviewService.getReviewsForProduct(currentProduct.id));
    }
  }
}
