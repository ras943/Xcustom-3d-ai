
import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number; // Storing as number for calculation
  image: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'faisal3dprint_cart';
  cartItems = signal<CartItem[]>(this.loadCartFromStorage());

  cartCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  cartTotal = computed(() =>
    this.cartItems().reduce((total, item) => total + item.price * item.quantity, 0)
  );

  private loadCartFromStorage(): CartItem[] {
    if (typeof localStorage !== 'undefined') {
      const storedCart = localStorage.getItem(this.STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  }

  private saveCartToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems()));
    }
  }

  addToCart(product: Omit<CartItem, 'quantity'>): void {
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        items.push({ ...product, quantity: 1 });
      }
      this.saveCartToStorage();
      return [...items]; // Return a new array reference to trigger change detection
    });
  }

  updateQuantity(productId: number, change: number): void {
    this.cartItems.update((items) => {
      const item = items.find((item) => item.id === productId);
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
          return items.filter((i) => i.id !== productId);
        }
      }
      this.saveCartToStorage();
      return [...items];
    });
  }

  removeItem(productId: number): void {
    this.cartItems.update((items) => {
      const updatedItems = items.filter((item) => item.id !== productId);
      this.saveCartToStorage();
      return updatedItems;
    });
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.saveCartToStorage();
  }
}
