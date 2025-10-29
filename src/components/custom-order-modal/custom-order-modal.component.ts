import { Component, input, output, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-order-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custom-order-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomOrderModalComponent {
  isOpen = input.required<boolean>();
  initialDescription = input<string | null>(null);
  closeModal = output<void>();
  submitOrder = output<any>(); // Emits form value

  fileName = signal<string | null>(null);

  customOrderForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    projectDescription: ['', Validators.required],
    designFiles: [null as File | null], // To store the file object
  });

  constructor(private fb: FormBuilder) {
    effect(() => {
      const desc = this.initialDescription();
      if (desc) {
        this.customOrderForm.patchValue({ projectDescription: desc });
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.customOrderForm.patchValue({ designFiles: file });
      this.fileName.set(file.name);
    } else {
      this.customOrderForm.patchValue({ designFiles: null });
      this.fileName.set(null);
    }
  }

  onSubmit(): void {
    if (this.customOrderForm.valid) {
      this.submitOrder.emit(this.customOrderForm.value);
      this.customOrderForm.reset();
      this.fileName.set(null);
    } else {
      console.log('Form is invalid', this.customOrderForm.errors);
      // Optionally show error messages to the user
    }
  }

  onClose(): void {
    this.closeModal.emit();
    this.customOrderForm.reset(); // Clear form on close
    this.fileName.set(null);
  }
}
