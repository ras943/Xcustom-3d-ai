import { Injectable } from '@angular/core';

export interface Review {
  productId: number;
  author: string;
  rating: number; // 1-5
  text: string;
  date: string; // ISO string
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly STORAGE_KEY = 'faisal3dprint_reviews';

  private getAllReviews(): Review[] {
    if (typeof localStorage === 'undefined') return [];
    const storedReviews = localStorage.getItem(this.STORAGE_KEY);
    return storedReviews ? JSON.parse(storedReviews) : [];
  }

  private saveAllReviews(reviews: Review[]): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews));
  }

  getReviewsForProduct(productId: number): Review[] {
    return this.getAllReviews()
      .filter(review => review.productId === productId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  addReview(productId: number, newReview: { rating: number; text: string }): void {
    const review: Review = {
      productId,
      author: 'Valued Customer', // Keeping it simple for now
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString(),
    };
    
    const allReviews = this.getAllReviews();
    allReviews.push(review);
    this.saveAllReviews(allReviews);
  }
}
