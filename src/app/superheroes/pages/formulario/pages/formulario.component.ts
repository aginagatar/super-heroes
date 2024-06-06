import { Component } from '@angular/core';
import { SharedModule } from 'src/app/superheroes/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SuperHeroesService } from 'src/app/superheroes/services/super-heroes.service';
import { SuperHeroesDataService } from 'src/app/superheroes/services/super-heroes.dataService';
import { ojos, superpoderes } from 'src/app/superheroes/core/constantes';
import { Superheroe } from 'src/app/superheroes/model/superheroe.model';
import { Comunes } from 'src/app/superheroes/core/comunes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export default class FormularioComponent {

  color = '';
  formulario: FormGroup;
  public ojos: any = ojos;
  selectedDate: Date;
  public superpoderes: any = superpoderes;
  public superheroe: Superheroe = <Superheroe>{};
  public esEditar: boolean;
  public txtBotonForm = 'Crear';
  public tituloForm = 'Alta Superhéroe';

  constructor(private fb: FormBuilder,
    private superHeroesService: SuperHeroesService,
    private superHeroesDataService: SuperHeroesDataService,
    private comunes: Comunes,
    private router: Router) {
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
      nombre: [this.superheroe.nombre, Validators.required],
      genero: [this.superheroe.genero, Validators.required],
      colorOjos: [this.superheroe.colorOjos, Validators.required],
      superpoderes: [this.superheroe.superpoderes ? this.superheroe.superpoderes : [], Validators.required],
      fechaNacimiento: [this.superheroe.fechaNacimiento, [Validators.required, this.fechaMenorQueAyer]],
      color: [this.superheroe.color, Validators.required]
    });
  }

  changeColor(e) {
    console.log(e);
    this.formulario.get('color').setValue(e);
    this.formulario.get('color').markAsTouched();
  }

  enviar() {
    if (this.formulario.valid) {
      // Realizar acción de envío aquí
      console.log('Formulario válido. Datos:', this.formulario.value);
      const superHeroe: any = this.formulario.value;

      if (this.esEditar) {
        superHeroe.id = this.superheroe.id;
        this.superHeroesService.editarSuperHeroe(superHeroe).subscribe(res => {
          console.log(res);
          this.comunes.aviso('Se ha editado a ' + superHeroe.nombre);
          this.router.navigate(['/tabla-listado']);
        });
      } else {
        this.superHeroesService.crearSuperHeroe(superHeroe).subscribe(res => {
          console.log(res);
          this.comunes.aviso('Se ha creado a ' + superHeroe.nombre);
          this.router.navigate(['/tabla-listado']);
        });
      }
    } else {
      // Marcar los campos inválidos como tocados para que se muestren los mensajes de error
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

  marcarSuperpoderesDefecto(sp) {
    if (!this.superheroe.superpoderes) {
      return false;
    }
    return this.superheroe.superpoderes.includes(sp);
  }

  onCheckboxChange(e, superpoder) {
    console.log(e);
    const superpoderesSeleccionados = this.formulario.get('superpoderes').value;
    if (e.checked) {
      superpoderesSeleccionados.push(superpoder);
    } else {
      const index = superpoderesSeleccionados.indexOf(superpoder);
      if (index !== -1) {
          superpoderesSeleccionados.splice(index, 1);
      }
    }
    this.formulario.get('superpoderes').setValue(superpoderesSeleccionados);
    console.log(superpoderesSeleccionados);
  }

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
