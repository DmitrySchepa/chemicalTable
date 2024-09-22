import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filter-elements',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './filter-elements.component.html',
  styleUrl: './filter-elements.component.scss',
})
export class FilterElementsComponent {
  value = '';
  onFilterElements = output<string>();

  filterElements(newValue: string) {
    if (!newValue) {
      this.value = '';
    }
    this.onFilterElements.emit(newValue);
  }
}
