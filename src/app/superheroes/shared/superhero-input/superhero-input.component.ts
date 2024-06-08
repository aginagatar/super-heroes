import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-superhero-input',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [SharedModule],
  templateUrl: './superhero-input.component.html'
})
export class SuperheroInputComponent {
  @Input() control: FormControl;
  @Input() isEdit: boolean;
}
