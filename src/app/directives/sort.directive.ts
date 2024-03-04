import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { Sort } from '../util/sort';

@Directive({
  selector: '[appSort]',
})
export class SortDirective {
  @Input() appSort: Array<any> = [];

  constructor(private targetElem: ElementRef) {}

  @HostListener('click')
  sortData() {
    const sort = new Sort();
    const elem = this.targetElem.nativeElement;

    const order = elem.getAttribute('data-order');
    const property = elem.getAttribute('data-name');

    if (order === 'desc') {
      this.appSort.sort(sort.startSort(property, 'asc'));
      elem.setAttribute('data-order', 'asc');
      this.resetSortIndicators(elem);
      elem.classList.add('sort-asc');
      elem.classList.remove('sort-desc');
    } else {
      this.appSort.sort(sort.startSort(property, 'desc'));
      elem.setAttribute('data-order', 'desc');
      this.resetSortIndicators(elem);
      elem.classList.add('sort-desc');
      elem.classList.remove('sort-asc');
    }
  }

  private resetSortIndicators(currentElem: HTMLElement) {
    // Assuming you have a way to select all sorted columns, for example, by a shared class name 'sortable'
    const sortableColumns =
      this.targetElem.nativeElement.parentElement.querySelectorAll('.sortable');
    sortableColumns.forEach((column: Element) => {
      if (column !== currentElem) {
        column.classList.remove('sort-asc', 'sort-desc');
        // Optionally reset the data-order attribute to its initial state
        column.setAttribute('data-order', 'asc'); // Adjust based on your default sort order
      }
    });
  }
}
