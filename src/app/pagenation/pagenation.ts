import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,  } from '@angular/core';

@Component({
  selector: 'app-pagenation',
  imports: [CommonModule],
  templateUrl: './pagenation.html',
  styleUrl: './pagenation.css',
  standalone: true
})
export class Pagenation implements OnChanges, OnInit  {
  
  @Input() itemlength: number = 0;
  @Output() pageChange = new EventEmitter<any>();

  @Input() currentPage: number = 1;
  @Input() itemsPerPage = 10;
  @Input() products: any[] = [];
  
  totalPages: number = 0;
  visiblePages: (number | string)[] = [];
  private readonly siblingsCount = 1; // Pages to show around current page

  ngOnInit(): void {
    this.calculatePages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemlength'] || changes['itemsPerPage']) {
      this.calculatePages();
    }
  }

  calculatePages(): void {
    this.totalPages = Math.ceil(this.itemlength / this.itemsPerPage);
    this.visiblePages = this.getVisiblePages();
  }

  getVisiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const leftSibling = Math.max(this.currentPage - this.siblingsCount, 1);
    const rightSibling = Math.min(this.currentPage + this.siblingsCount, this.totalPages);
    const shouldShowLeftEllipsis = leftSibling > 2;
    const shouldShowRightEllipsis = rightSibling < this.totalPages - 1;

    // Always show first page
    pages.push(1);

    // Add left ellipsis if needed
    if (shouldShowLeftEllipsis) {
      pages.push('...');
    } else if (leftSibling > 1) {
      // If no ellipsis, just add pages between first and current
      for (let i = 2; i < leftSibling; i++) {
        pages.push(i);
      }
    }

    // Add pages around current page
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== this.totalPages) {
        pages.push(i);
      }
    }

    // Add right ellipsis if needed
    if (shouldShowRightEllipsis) {
      pages.push('...');
    } else if (rightSibling < this.totalPages - 1) {
      // If no ellipsis, just add pages between current and last
      for (let i = rightSibling + 1; i < this.totalPages; i++) {
        pages.push(i);
      }
    }

    // Always show last page if more than 1 page
    if (this.totalPages > 1) {
      pages.push(this.totalPages);
    }

    return pages;
  }

  changePage(page: number | string): void {
    if (typeof page === 'string') return; // Don't do anything for ellipsis

    if (page < 1 || page > this.totalPages) return; // Out of bounds

    this.currentPage = page;
    this.visiblePages = this.getVisiblePages();

    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.pageChange.emit({ start: start, end: end, page: page });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }
}
