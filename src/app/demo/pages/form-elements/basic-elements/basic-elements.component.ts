import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SuperHeroesService } from 'src/app/demo/services/super-heroes.service';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss'],
})
export default class BasicElementsComponent {

  color = '';

  formulario: FormGroup;
  ojos: any = [
    {value: 'A', color: 'Azules'},
    {value: 'M', color: 'Marrones'},
    {value: 'N', color: 'Negros'},
    {value: 'V', color: 'Verdes'},
    {value: 'O', color: 'Otro'}
  ];
  selectedDate: Date;

  superpoderes: any = [
    {value: 'VU', poder: 'Vuelo'},
    {value: 'IN', poder: 'Invisibilidad'},
    {value: 'TQ', poder: 'Telequinesis'},
    {value: 'SF', poder: 'Superfuerzarde'},
    {value: 'TP', poder: 'Telepatía'},
    {value: 'TT', poder: 'Teletransporte'},
    {value: 'VE', poder: 'Velocidad'},
    {value: 'RX', poder: 'Rayos X'}
  ];

  constructor(private formBuilder: FormBuilder,
    private superHeroesService: SuperHeroesService) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      colorOjos: ['', Validators.required],
      superpoderes: this.formBuilder.array([], Validators.required),
      fechaNacimiento: ['', [Validators.required, this.fechaMenorQueAyer]],
      color: ['', Validators.required]
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

      this.superHeroesService.crearSuperHeroe(superHeroe).subscribe(res => {
        console.log(res);
      });
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

  onCheckboxChange(e, superpoder) {
    console.log(e);
    const superpoderes: FormArray = this.formulario.get('superpoderes') as FormArray;
    if (e.checked) {
      superpoderes.push(this.formBuilder.control(superpoder));
    } else {
      const index = superpoderes.controls.findIndex(x => x.value === superpoder);
      superpoderes.removeAt(index);
    }
    console.log(superpoderes);
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
