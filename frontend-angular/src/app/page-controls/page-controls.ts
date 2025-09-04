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

  @Input()
  public totalPages: number = 1;

  ngOnInit(): void { }

  onItemsPerPageSelect(event: Event) {
    const itemsPerPage = Number((event.target as HTMLSelectElement).value);
    this.onPagerDataChanged.emit({ ...this.pagerData, itemsPerPage: itemsPerPage, currentPageNo: 1 });
    console.log(this.totalPages)
  }

  onCurrentPageSelect(event: Event) {
    
  }


}
