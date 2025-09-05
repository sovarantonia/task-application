import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOptionList } from '../entity/select-option-list';

@Component({
  selector: 'filter-controls',
  imports: [],
  templateUrl: './filter-controls.html',
  styleUrl: './filter-controls.css'
})
export class FilterControls implements OnInit {
  @Input() public selectOptionList!: SelectOptionList[];
  @Output() public onFilterCriteriaChanged = new EventEmitter<Map<string, string>>();

  public filterCriteria = new Map<string, string>();

  ngOnInit(): void {
    this.selectOptionList.forEach(col => this.filterCriteria.set(col.foreignKey, "All"));
  }

  onChange(column: string, event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filterCriteria.set(column, selectedValue);

    this.onFilterCriteriaChanged.emit(this.filterCriteria);
  }
}
