import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenAIService } from '../../services/genai.service';
import { AppComponent } from '../../app.component';

interface AiConceptResult {
  description: string;
  imageUrl: string;
}

type ViewState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; result: AiConceptResult }
  | { status: 'error'; error: string };

@Component({
  selector: 'app-ai-customizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-customizer.component.html',
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiCustomizerComponent {
  private genAIService = inject(GenAIService);
  private appComponent = inject(AppComponent);

  state = signal<ViewState>({ status: 'idle' });

  async generateConcept(prompt: string): Promise<void> {
    if (!prompt.trim() || this.state().status === 'loading') {
      return;
    }

    this.state.set({ status: 'loading' });

    try {
      const result = await this.genAIService.generateDesignConcept(prompt);
      this.state.set({ status: 'success', result });
    } catch (error: any) {
      this.state.set({ status: 'error', error: error.message || 'An unknown error occurred.' });
    }
  }

  requestQuote(description: string): void {
    // This is a way to call a method on the root component.
    // In larger apps, a shared service/state management would be better.
    this.appComponent.openCustomOrderModal(description);
  }
}
