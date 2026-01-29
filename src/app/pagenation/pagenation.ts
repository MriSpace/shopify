import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,  } from '@angular/core';

@Component({
  selector: 'app-pagenation',
  imports: [CommonModule],
  templateUrl: './pagenation.html',
  styleUrl: './pagenation.css',
  standalone: true
})
export class Pagenation implements OnChanges  {
  
  @Input() products: any[] = [];
  @Output() pageChange = new EventEmitter<any[]>();

  @Input() currentPage!: number;
  itemsPerPage = 10;
  ngOnChanges(changes: SimpleChanges): void {
    this.changePage(this.currentPage)
  }
  
  changePage(page: number) {
    this.currentPage = page;

    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    const paged = this.products.slice(start, end);
    this.pageChange.emit(paged);
  }
}
 
