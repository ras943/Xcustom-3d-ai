
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AiCustomizerComponent } from './pages/ai-customizer/ai-customizer.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'ai-customizer', component: AiCustomizerComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'tracking/:orderId', component: TrackingComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect to home for any other route
];
