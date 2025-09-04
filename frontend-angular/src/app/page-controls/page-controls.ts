import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagerData } from '../entity/pager-data';


@Component({

  selector: 'page-controls',
  imports: [],
  templateUrl: './page-controls.html',
  styleUrl: './page-controls.css'
})
export class PageControls implements OnInit {
  @Input()
  public pagerData!: PagerData;

  @Output()
  public onPagerDataChanged = new EventEmitter<PagerData>();

  public options: number[] = [];

  private _totalPages!: number;

  @Input() set totalPages(value: number) {
    this._totalPages = value;
    this.options = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  };

  get totalPages() {
    return this._totalPages;
  }

  ngOnInit(): void {  }

  onItemsPerPageSelect(event: Event) {
    this.pagerData.itemsPerPage = Number((event.target as HTMLSelectElement).value);
    this.pagerData.currentPageNo = 1;
    this.onPagerDataChanged.emit(this.pagerData);
  }

  onCurrentPageSelect(event: Event) {
    this.pagerData.currentPageNo = Number((event.target as HTMLSelectElement).value);
    this.onPagerDataChanged.emit(this.pagerData);
  }


}
