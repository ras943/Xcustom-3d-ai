import "@angular/compiler"; // Required for JIT compilation in Applet environment
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './src/app.component';
import { provideRouter, withHashLocation } from '@angular/router';
import { APP_ROUTES } from "./src/app.routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideZonelessChangeDetection(),
    provideRouter(APP_ROUTES, withHashLocation()), // Using hash location strategy for Applet environment
  ],
}).catch(err => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.