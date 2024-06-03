import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [SharedModule, NgbDropdownModule],
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss'],
})
export default class BasicElementsComponent {

  formulario: FormGroup;
  ojos: any = [
    {value: 'A', color: 'Azul'},
    {value: 'M', color: 'Marrón'},
    {value: 'N', color: 'Negro'},
    {value: 'V', color: 'Verde'},
    {value: 'O', color: 'Otro'}
  ];

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

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      colorOjos: ['', Validators.required],
      superpoderes: this.formBuilder.array([], Validators.required)
    });
  }

  enviar() {
    if (this.formulario.valid) {
      // Realizar acción de envío aquí
      console.log('Formulario válido. Datos:', this.formulario.value);
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
}
