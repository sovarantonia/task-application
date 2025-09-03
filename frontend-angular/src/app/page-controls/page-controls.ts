import { Component, OnInit } from '@angular/core';
import { PagerData } from '../entity/pager-data';

@Component({
  selector: 'page-controls',
  imports: [],
  templateUrl: './page-controls.html',
  styleUrl: './page-controls.css'
})
export class PageControls implements OnInit {
  public pagerData: PagerData = {currentPageNo: 1, itemsPerPage: 5};

  ngOnInit(): void {

  }

  onItemsPerPageSelect(event: Event) {
    this.pagerData.itemsPerPage = Number((event.target as HTMLSelectElement).value);
    this.pagerData.currentPageNo = 1;
    // console.log("items per page");
    // console.log(this.pagerData.itemsPerPage);
  }


}
