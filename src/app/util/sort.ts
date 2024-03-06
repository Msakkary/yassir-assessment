/**
 * @fileoverview
 * Sort utility class for sorting arrays based on specified properties.
 */

export class Sort {
  private sortOrder = 1;

  constructor() {}

  /**
   * Sorts the array based on the specified property and order.
   * @param array - The array to be sorted.
   * @param property - The property to sort by.
   * @param order - The sorting order ('asc' for ascending, 'desc' for descending).
   * @returns - The sorted array.
   */
  public startSort(array: any[], property: string, order: string): any[] {
    this.sortOrder = order === 'desc' ? -1 : 1;

    return array.sort((a, b) => {
      const aValue = this.getPropertyValue(a, property);
      const bValue = this.getPropertyValue(b, property);

      // Use default string/number comparison for sorting
      return aValue === bValue ? 0 : aValue < bValue ? -this.sortOrder : this.sortOrder;
    });
  }

  /**
   * Retrieves the property value from an object based on a dot-separated property path.
   * @param object - The object from which to retrieve the property value.
   * @param property - The dot-separated property path.
   * @returns - The value of the specified property in the object.
   */
  private getPropertyValue(object: any, property: string): any {
    const keys = property.split('.');
    let value = object;

    for (const key of keys) {
      if (value[key] !== undefined) {
        value = value[key];
      } else {
        return undefined; // or a value that makes sense for your comparison
      }
    }

    return value;
  }
}
