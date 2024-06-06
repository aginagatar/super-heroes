// angular import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// project import
import { CardComponent } from './card/card.component';

// bootstrap import
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    NgbModule,
    NgScrollbarModule,
    NgbCollapseModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    NgbModule,
    NgScrollbarModule,
    NgbCollapseModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    ColorPickerModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule
  ],
})
export class SharedModule {}
