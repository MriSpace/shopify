import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output,  } from '@angular/core';

@Component({
  selector: 'app-pagenation',
  imports: [CommonModule],
  templateUrl: './pagenation.html',
  styleUrl: './pagenation.css',
  standalone: true
})
export class Pagenation  {
  
  @Input() products: any[] = [];
  @Output() pageChange = new EventEmitter<any[]>();

  currentPage = 1;
  itemsPerPage = 10;

  changePage(page: number) {
    this.currentPage = page;

    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    const paged = this.products.slice(start, end);
    this.pageChange.emit(paged);
  }
}
 
