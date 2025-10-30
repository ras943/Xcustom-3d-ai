import { Component, ChangeDetectionStrategy, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewFormComponent {
  reviewSubmit = output<{ rating: number; text: string }>();

  reviewForm = this.fb.group({
    rating: [0, [Validators.required, Validators.min(1)]],
    text: ['', Validators.required],
  });

  hoverRating = signal(0);
  stars = [1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder) {}

  setRating(rating: number): void {
    this.reviewForm.get('rating')?.setValue(rating);
  }

  setHoverRating(rating: number): void {
    this.hoverRating.set(rating);
  }

  resetHoverRating(): void {
    this.hoverRating.set(0);
  }

  onSubmit(): void {
    if (this.reviewForm.valid && this.reviewForm.dirty) {
      const formValue = this.reviewForm.value;
      this.reviewSubmit.emit({
          rating: formValue.rating ?? 0,
          text: formValue.text ?? ''
      });
      this.reviewForm.reset({ rating: 0, text: '' });
      this.reviewForm.markAsPristine();
    }
  }
}
