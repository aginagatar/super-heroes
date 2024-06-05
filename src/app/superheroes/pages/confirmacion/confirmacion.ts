import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";

@Component({
  selector: 'confirmacion',
  templateUrl: 'confirmacion.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class Confirmacion {

  constructor(public dialogRef: MatDialogRef<Confirmacion>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


    sendData(borrar: boolean): void {
      this.dialogRef.close(borrar);
    }
}
