import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


    sendData(borrar: boolean): void {
      this.dialogRef.close(borrar);
    }
}
