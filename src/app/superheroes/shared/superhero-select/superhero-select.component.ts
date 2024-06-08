import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-superhero-select',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [SharedModule],
  templateUrl: './superhero-select.component.html'
})
export class SuperheroSelectComponent {
  @Input() control: FormControl;
  @Input() valores: { value: string, color: string }[];
}
