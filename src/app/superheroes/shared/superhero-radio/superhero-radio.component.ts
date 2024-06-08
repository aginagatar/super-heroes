import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-superhero-radio',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [SharedModule],
  templateUrl: './superhero-radio.component.html'
})
export class SuperheroRadioComponent {
  @Input() control: FormControl;
}
