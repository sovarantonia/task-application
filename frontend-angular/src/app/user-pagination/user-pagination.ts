import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MobxAngularModule } from 'mobx-angular';
import { UserService } from '../service/user/user-service';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { User } from '../entity/user';
import { PagerData } from '../entity/pager-data';
import { PageControls } from "../page-controls/page-controls";
import { RawPaginationDetails } from '../entity/raw-pagination-details';

@Component({
  selector: 'user-pagination',
  imports: [MobxAngularModule, PageControls],
  templateUrl: './user-pagination.html',
  styleUrl: './user-pagination.css'
})
export class UserPagination implements OnInit {
  constructor(public userService: UserService, private cdref: ChangeDetectorRef) { makeAutoObservable(this); }
  public pagerData: PagerData = { currentPageNo: 1, itemsPerPage: 5 };
  public paginationDetails: RawPaginationDetails = { pagerData: this.pagerData, sortCriteria: new Map<string, number>(), filterCriteria: new Map<string, string>() };

  @observable paginatedUsers: User[] = [];
  @observable totalPages: number = 1;


  ngOnInit() {
    this.getPaginatedUsers();
  }

  async getPaginatedUsers() {
    this.cdref.detectChanges();
    const res = await this.userService.getPaginatedUsers(this.paginationDetails);
    runInAction(() => {
      this.paginatedUsers = res.paginatedItems;
      this.totalPages = res.totalPages;
      this.cdref.detectChanges();
    })
  }

  onPagerDataChanged(pagerData: PagerData) {
    this.pagerData = pagerData;
    this.paginationDetails.pagerData = pagerData;
    this.getPaginatedUsers();
  }

}
