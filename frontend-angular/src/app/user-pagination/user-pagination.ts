import { Component, OnInit } from '@angular/core';
import { MobxAngularModule } from 'mobx-angular';
import { UserService } from '../service/user/user-service';

@Component({
  selector: 'user-pagination',
  imports: [MobxAngularModule],
  templateUrl: './user-pagination.html',
  styleUrl: './user-pagination.css'
})
export class UserPagination implements OnInit {
  constructor(public userService: UserService) { }
  ngOnInit(): void {
    // this.userService.getPaginatedUsers();
  }

}
