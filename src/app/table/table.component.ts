import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import ELEMENT_DATA from '../data/chemical-elements';
import { rxState } from '@rx-angular/state';
import { PeriodicElement } from '../types/periodicElement';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { FilterElementsComponent } from '../filter-elements/filter-elements.component';
import { ReactiveFormsModule } from '@angular/forms';
import { delay, filter, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, FilterElementsComponent, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource$!: Observable<PeriodicElement[]>;
  private state = rxState<{ elements: PeriodicElement[] }>(({ set }) => {
    set({ elements: ELEMENT_DATA });
  });
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dataSource$ = this.state.select('elements');
  }

  onEdit(newValue: string, position: number, field: string): void {
    this.state.set('elements', ({ elements }) =>
      elements.map((el: PeriodicElement) => {
        return el.position === position ? { ...el, [field]: newValue } : el;
      })
    );
    this.dataSource$ = this.state.select('elements');
  }

  openDialog(position: number, field: string): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        field,
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.onEdit(result, position, field);
      }
    });
  }

  filterElements(value: string) {
    this.dataSource$ = this.state.select('elements').pipe(
      delay(2000),
      map((elements: PeriodicElement[]): PeriodicElement[] => {
        return elements.filter((el) => {
          const { name, symbol, weight } = el;
          value = value.toLowerCase();

          if (isNaN(+value)) {
            return (
              name.toLowerCase().includes(value) ||
              symbol.toLowerCase().includes(value)
            );
          }
          return weight.toString().includes(value);
        });
      })
    );
  }
}
