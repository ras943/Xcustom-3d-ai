import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenAIService } from '../../services/genai.service';

interface HubResult {
  text: string;
  sources: any[];
}

type ViewState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; result: HubResult }
  | { status: 'error'; error: string };

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private genAIService = inject(GenAIService);
  state = signal<ViewState>({ status: 'idle' });

  async findHubs(location: string): Promise<void> {
    if (!location.trim()) return;
    this.state.set({ status: 'loading' });

    try {
      const result = await this.genAIService.findNearbyPrintingHubs(location);
      this.state.set({ status: 'success', result });
    } catch (error: any) {
      this.state.set({ status: 'error', error: error.message || 'An unknown error occurred.' });
    }
  }
}
