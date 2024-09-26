import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
type STACK_TYPE = 'STANDARD' | 'SPECIAL' | 'REJECTED';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-form-example';
  sortedValue: STACK_TYPE | null = null;
  error: string | null = null;
  formGroup = new FormGroup({
    height: new FormControl('', [Validators.required, Validators.min(0.1)]),
    width: new FormControl('', [Validators.required, Validators.min(0.1)]),
    length: new FormControl('', [Validators.required, Validators.min(0.1)]),
    mass: new FormControl('', [Validators.required, Validators.min(0.1)]),
  });

  onSubmit() {
    this.error = null;
    const formHeight = this.formGroup.get('height')?.value;
    const formWidth = this.formGroup.get('width')?.value;
    const formLength = this.formGroup.get('length')?.value;
    const formMass = this.formGroup.get('mass')?.value;

    if (!formHeight || !formWidth || !formLength || !formMass) {
      this.error = 'Please fill all fields';
      return;
    }

    const height = +formHeight;
    const width = +formWidth;
    const length = +formLength;
    const mass = +formMass;
    const volume = height * width * length;

    let isBulky = false;
    let isHeavy = false;

    if (volume > 1000000 || height > 150 || width > 150 || length > 150) {
      isBulky = true;
    }
    if (mass > 20) {
      isHeavy = true;
    }

    if (isBulky && isHeavy) {
      this.error = 'Item is too bulky and heavy';
      this.sortedValue = 'REJECTED';
    } else if (isBulky || isHeavy) {
      this.sortedValue = 'SPECIAL';
    } else {
      this.sortedValue = 'STANDARD';
    }
  }
}
