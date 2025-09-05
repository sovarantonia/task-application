import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MobxAngularModule } from 'mobx-angular';
import { UserService } from '../service/user/user-service';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { User } from '../entity/user';
import { PagerData } from '../entity/pager-data';
import { PaginationRequest } from '../entity/pagination-request';
import { PageControls } from "../page-controls/page-controls";

@Component({
  selector: 'user-pagination',
  imports: [MobxAngularModule, PageControls],
  templateUrl: './user-pagination.html',
  styleUrl: './user-pagination.css'
})
export class UserPagination implements OnInit {
  constructor(public userService: UserService, private cdref: ChangeDetectorRef) { makeAutoObservable(this); }
  public pagerData: PagerData = { currentPageNo: 1, itemsPerPage: 5 };
  public paginationRequest: PaginationRequest = { pagerData: this.pagerData, sortCriteria: [], filterCriteria: [] };

  @observable paginatedUsers: User[] = [];
  @observable totalPages: number = 1;


  ngOnInit() {
    this.getPaginatedUsers();
  }

  async getPaginatedUsers() {
    this.cdref.detectChanges();
    const res = await this.userService.getPaginatedUsers(this.paginationRequest);
    runInAction(() => {
      this.paginatedUsers = res.paginatedItems;
      this.totalPages = res.totalPages;
      this.cdref.detectChanges();
    })
  }

  onPagerDataChanged(pagerData: PagerData) {
    this.pagerData = pagerData;
    this.paginationRequest.pagerData = pagerData;
    this.getPaginatedUsers();
  }

}
