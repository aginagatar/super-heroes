import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import FormularioComponent from './formulario.component';
import { SuperHeroesService } from 'src/app/superheroes/services/super-heroes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SuperheroFormComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule,
        FormularioComponent,
        HttpClientTestingModule
      ],
      providers: [SuperHeroesService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('FormularioComponent', () => {
    // ... previous setup code

    it('should have a valid form when all required fields are filled', () => {
      component.formulario.controls['nombre'].setValue('Superman');
      component.formulario.controls['colorOjos'].setValue('blue');
      component.formulario.controls['fechaNacimiento'].setValue(new Date('2000-01-01'));
      component.formulario.controls['genero'].setValue('M');
      component.formulario.controls['superpoderes'].setValue(['VU', 'SF']);
      component.formulario.controls['color'].setValue('#ff0000');

      expect(component.formulario.valid).toBeTruthy();
    });

    it('should have an invalid form when required fields are missing', () => {
      component.formulario.controls['nombre'].setValue('');
      component.formulario.controls['colorOjos'].setValue('');
      component.formulario.controls['fechaNacimiento'].setValue('');
      component.formulario.controls['genero'].setValue('');
      component.formulario.controls['superpoderes'].setValue([]);
      component.formulario.controls['color'].setValue('');

      expect(component.formulario.invalid).toBeTruthy();
    });

    it('should display an error message when the nombre field is touched and empty', () => {
      let nombreInput = component.formulario.controls['nombre'];
      nombreInput.markAsTouched();
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('mat-error').textContent).toContain('El nombre es requerido');
    });

  });

});
