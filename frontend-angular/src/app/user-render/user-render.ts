import { Component, Input } from '@angular/core';
import { observable } from 'mobx';
import { User } from '../entity/user';
import { MobxAngularModule } from "mobx-angular";

@Component({
  selector: 'user-render',
  imports: [MobxAngularModule],
  templateUrl: './user-render.html',
  styleUrl: './user-render.css'
})
export class UserRender {
  @observable @Input() public paginatedUsers!: User[];
}
