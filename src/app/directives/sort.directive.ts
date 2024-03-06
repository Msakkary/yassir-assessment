/**
 * @fileoverview
 * SortDirective is an Angular directive for enabling sorting on table columns.
 * It allows users to click on a column header to toggle between ascending and descending sorting.
 */

import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { Sort } from '../util/sort';

@Directive({
  selector: '[appSort]',
})
export class SortDirective {
  @Input() appSort: Array<any> = []; // Input property to specify the array to be sorted

  /**
   * Constructor for SortDirective.
   * @param targetElem - ElementRef for accessing and manipulating the element to which the directive is applied.
   */
  constructor(private targetElem: ElementRef) {}

  /**
   * HostListener for the 'click' event on the directive's host element (table column header).
   * Sorts the data based on the clicked column and toggles between ascending and descending order.
   */
  @HostListener('click')
  sortData() {
    const sort = new Sort();
    const elem = this.targetElem.nativeElement;
    const order = elem.getAttribute('data-order');
    const property = elem.getAttribute('data-name');

    if (order === 'desc') {
      // Sort in ascending order
      this.appSort.sort(sort.startSort(property, 'asc'));
      elem.setAttribute('data-order', 'asc');
      this.resetSortIndicators(elem);
      elem.classList.add('sort-asc');
      elem.classList.remove('sort-desc');
    } else {
      // Sort in descending order
      this.appSort.sort(sort.startSort(property, 'desc'));
      elem.setAttribute('data-order', 'desc');
      this.resetSortIndicators(elem);
      elem.classList.add('sort-desc');
      elem.classList.remove('sort-asc');
    }
  }

  /**
   * Resets sorting indicators on other sortable columns.
   * @param currentElem - The element that triggered the sorting.
   */
  private resetSortIndicators(currentElem: HTMLElement) {
    // Assuming you have a way to select all sorted columns, for example, by a shared class name 'sortable'
    const sortableColumns =
      this.targetElem.nativeElement.parentElement.querySelectorAll('.sortable');
    sortableColumns.forEach((column: Element) => {
      if (column !== currentElem) {
        // Reset sorting classes
        column.classList.remove('sort-asc', 'sort-desc');
        // Optionally reset the data-order attribute to its initial state
        column.setAttribute('data-order', 'asc'); // Adjust based on your default sort order
      }
    });
  }
}
