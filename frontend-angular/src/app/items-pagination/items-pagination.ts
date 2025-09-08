import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { PagerData } from '../entity/pager-data';
import { RawPaginationDetails } from '../entity/raw-pagination-details';
import { SortColumn } from '../entity/sort-column';
import { SelectOptionList } from '../entity/select-option-list';
import { PageControls } from "../page-controls/page-controls";
import { SortControls } from "../sort-controls/sort-controls";
import { FilterControls } from "../filter-controls/filter-controls";
import { PaginationResponse } from '../entity/pagination-response';

@Component({
  selector: 'items-pagination',
  imports: [PageControls, SortControls, FilterControls],
  templateUrl: './items-pagination.html',
  styleUrl: './items-pagination.css'
})
export class ItemsPagination implements OnInit {
  @Input() public paginationFunction!:(details: RawPaginationDetails) => Promise<PaginationResponse<any>>;
  @observable public paginatedItems: any[] = [];
  @observable public totalPages: number = 1;

  public pagerData: PagerData = { currentPageNo: 1, itemsPerPage: 5 };
  public paginationDetails: RawPaginationDetails = { pagerData: this.pagerData, sortCriteria: new Map<string, number>(), filterCriteria: new Map<string, string>() };

  @Input() @observable public sortColumns: SortColumn[] = [];
  @Input() @observable public selectOptionList: SelectOptionList[] = [];

  @Output() public onPaginationResponse = new EventEmitter<any[]>();

  constructor(private cdref: ChangeDetectorRef) {
    makeAutoObservable(this);
  }

  ngOnInit(): void {
    this.getPaginatedItems();
  }

  async getPaginatedItems() {
    this.cdref.detectChanges();
    const res = await this.paginationFunction(this.paginationDetails);
    runInAction(() => {
      this.paginatedItems = res.paginatedItems;
      this.totalPages = res.totalPages;
      this.onPaginationResponse.emit(this.paginatedItems);
    });
    this.cdref.detectChanges();
  }

  onPagerDataChanged(pagerData: PagerData) {
    this.pagerData = pagerData;
    this.paginationDetails.pagerData = pagerData;
    this.getPaginatedItems();
  }

  onSortCriteriaChanged(sortCriteria: Map<string, number>) {
    this.paginationDetails.sortCriteria = sortCriteria;
    this.getPaginatedItems();
  }

  onFilterCriteriaChanged(fiterCriteria: Map<string, string>) {
    this.paginationDetails.filterCriteria = fiterCriteria;
    this.getPaginatedItems();
  }
}
