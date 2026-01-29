import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,  } from '@angular/core';

@Component({
  selector: 'app-pagenation',
  imports: [CommonModule],
  templateUrl: './pagenation.html',
  styleUrl: './pagenation.css',
  standalone: true
})
export class Pagenation implements OnChanges,OnInit  {
  
  @Input() itemlength: number = 0;
  @Output() pageChange = new EventEmitter<any>();

  @Input() currentPage!: number;
  @Input() itemsPerPage = 10;
  pages:any;
  ngOnChanges(changes: SimpleChanges): void {
    this.changePage(this.currentPage)
  }
  ngOnInit(): void {
    this.pages= new Array(this.itemlength/this.itemsPerPage)
    /// [x,d,f,g,h]

    //advance logic
    /// [1,2,...,5,6]
  }
  changePage(page: number) {
    this.currentPage = page;

    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    // const paged = this.items.slice(start, end);
    this.pageChange.emit({start:start,end:end});
  }
}
 
