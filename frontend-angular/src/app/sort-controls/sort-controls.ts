import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sort-controls',
  imports: [],
  templateUrl: './sort-controls.html',
  styleUrl: './sort-controls.css'
})
export class SortControls implements OnInit {
  @Input() public sortColumns!: string[];

  @Output() onSortCriteriaChanged = new EventEmitter<Map<string, number>>();
  columnClickCount: Map<string, number> = new Map();

  ngOnInit() { 
    this.sortColumns.forEach(col => this.columnClickCount.set(col, 0));
  }

  onClick(column: string) {
    let count = this.columnClickCount.get(column) ?? 0;
    count = count + 1 > 1 ? -1 : count + 1;
    this.columnClickCount.set(column, count);
    this.onSortCriteriaChanged.emit(this.columnClickCount);
  }
  

}
