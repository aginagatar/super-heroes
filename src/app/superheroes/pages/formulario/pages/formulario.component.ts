import { Component } from '@angular/core';
import { SharedModule } from 'src/app/superheroes/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SuperHeroesService } from 'src/app/superheroes/services/super-heroes.service';
import { SuperHeroesDataService } from 'src/app/superheroes/services/super-heroes.dataService';
import { ojos, superpoderes } from 'src/app/superheroes/core/constantes';
import { Superheroe } from 'src/app/superheroes/model/superheroe.model';
import { Comunes } from 'src/app/superheroes/core/comunes';
import { Router } from '@angular/router';
import { Ojo } from 'src/app/superheroes/model/ojo.model';
import { Superpoder } from 'src/app/superheroes/model/superpoder.model';
import { SuperheroInputComponent } from 'src/app/superheroes/shared/superhero-input/superhero-input.component';
import { SuperheroSelectComponent } from 'src/app/superheroes/shared/superhero-select/superhero-select.component';
import { SuperheroDatepickerComponent } from 'src/app/superheroes/shared/superhero-datepicker/superhero-datepicker.component';
import { SuperheroRadioComponent } from 'src/app/superheroes/shared/superhero-radio/superhero-radio.component';
import { SuperheroCheckboxComponent } from 'src/app/superheroes/shared/superhero-checkbox/superhero-checkbox.component';

@Component({
  selector: 'app-formulario',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [SharedModule, NgbDropdownModule, SuperheroInputComponent, SuperheroSelectComponent, SuperheroDatepickerComponent,
    SuperheroRadioComponent, SuperheroCheckboxComponent],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export default class FormularioComponent {

  public color = '';
  public formulario: FormGroup;
  public ojos: Ojo[] = ojos;
  public superpoderes: Superpoder[] = superpoderes;
  public superheroe: Superheroe = <Superheroe>{};
  public esEditar: boolean;
  public txtBotonForm = 'Crear';
  public tituloForm = 'Alta Superhéroe';

  constructor(private fb: FormBuilder,
    private superHeroesService: SuperHeroesService,
    private superHeroesDataService: SuperHeroesDataService,
    private comunes: Comunes,
    private router: Router) {

    // Mirar si es editar y superheroe
    if (this.superHeroesDataService.getSuperheroe()) {
      this.superheroe = this.superHeroesDataService.getSuperheroe();
      this.superHeroesDataService.setSuperheroe(null);
      this.superheroe.nombre = this.superheroe.nombre.toUpperCase();
      this.color = this.superheroe.color;
      this.esEditar = true;
      this.tituloForm = 'Editar Superhéroe';
      this.txtBotonForm = 'Editar';
    }
    this.formulario = this.fb.group({
      nombre: [this.superheroe.nombre, [Validators.required, Validators.maxLength(20)]],
      genero: [this.superheroe.genero, Validators.required],
      colorOjos: [this.superheroe.colorOjos, Validators.required],
      superpoderes: [this.superheroe.superpoderes ? this.superheroe.superpoderes : [], Validators.required],
      fechaNacimiento: [this.superheroe.fechaNacimiento, [Validators.required, this.fechaMenorQueAyer]],
      color: [this.superheroe.color, Validators.required]
    });
  }

  nombreControl(campo): FormControl {
    return this.formulario.get(campo) as FormControl;
  }

  changeColor(e) {
    this.formulario.get('color').setValue(e);
    this.formulario.get('color').markAsTouched();
  }

  enviar() {
    if (this.formulario.valid) {
      const superHeroe: Superheroe = this.formulario.value;
      if (this.esEditar) {
        superHeroe.id = this.superheroe.id;
        this.superHeroesService.editarSuperHeroe(superHeroe).subscribe(res => {
          this.comunes.aviso('Se ha editado a ' + superHeroe.nombre);
          this.router.navigate(['/tabla-listado']);
        });
      } else {
        this.superHeroesService.crearSuperHeroe(superHeroe).subscribe(res => {
          this.comunes.aviso('Se ha creado a ' + superHeroe.nombre);
          this.router.navigate(['/tabla-listado']);
        });
      }
    } else {
      this.marcarCamposComoTocados();
    }
  }

  marcarCamposComoTocados() {
    for (const control in this.formulario.controls) {
      if (this.formulario.controls.hasOwnProperty(control)) {
        this.formulario.controls[control].markAsTouched();
      }
    }
  }

  //Validador
  fechaMenorQueAyer(control) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const selectedDate = new Date(control.value);
    if (selectedDate >= yesterday) {
      return { fechaMenorQueAyer: true };
    }
    return null;
  }
}
