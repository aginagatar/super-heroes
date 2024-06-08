import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-superhero-datepicker',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [SharedModule],
  templateUrl: './superhero-datepicker.component.html'
})
export class SuperheroDatepickerComponent {
  @Input() control: FormControl;
}
