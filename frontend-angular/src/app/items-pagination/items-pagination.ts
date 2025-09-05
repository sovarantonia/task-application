import { Component, Input } from '@angular/core';
import { observable } from 'mobx';
import { ApiService } from '../service/api/api-service';

@Component({
  selector: 'items-pagination',
  imports: [],
  templateUrl: './items-pagination.html',
  styleUrl: './items-pagination.css'
})
export class ItemsPagination<T> {
  @Input() service!: ApiService<T>;
  
}
