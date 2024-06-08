import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-superhero-checkbox',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [SharedModule],
  templateUrl: './superhero-checkbox.component.html'
})
export class SuperheroCheckboxComponent {
  @Input() control: FormControl;
  @Input() valores: { value: string, poder: string }[];


  onCheckboxChange(event: any, value: string) {
    const selectedSuperpowers = this.control.value || [];
    if (event.checked) {
      this.control.setValue([...selectedSuperpowers, value]);
    } else {
      this.control.setValue(selectedSuperpowers.filter((superpoder: string) => superpoder !== value));
    }
    this.control.markAsTouched();
  }

  marcarSuperpoderesDefecto(value: string): boolean {
    const selectedSuperpowers = this.control.value || [];
    return selectedSuperpowers.includes(value);
  }
}
