import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Review } from '../../services/review.service';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './review-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewListComponent {
  reviews = input.required<Review[]>();
  stars = [1, 2, 3, 4, 5];
}
