import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  templateUrl: './edit-dialog.component.html',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class EditDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditDialogComponent>);
  value = '';

  onEdit(value: string) {
    this.dialogRef.close(value);
  }
}
