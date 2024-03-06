/**
 * Sort class for handling array sorting based on object properties.
 */
export class Sort {
  private sortOrder = 1;

  /**
   * Creates an instance of Sort.
   */
  constructor() {}

  /**
   * Starts the sorting process based on the specified property and order.
   * @param property - The property to sort by (supports nested properties using dot notation).
   * @param order - The sort order ('asc' for ascending, 'desc' for descending).
   * @returns A sorting function to be used with the `Array.sort` method.
   */
  public startSort(property: string, order: string) {
    if (order === 'desc') {
      this.sortOrder = -1;
    } else {
      this.sortOrder = 1;
    }
  
    /**
     * Sorting function to be used with the `Array.sort` method.
     * @param a - The first object for comparison.
     * @param b - The second object for comparison.
     * @returns A number indicating the order of the objects in the sorted array.
     */
    return (a: any, b: any) => {
      // Handle nested properties
      const aValue = this.getPropertyValue(a, property);
      const bValue = this.getPropertyValue(b, property);
  
      // Check if the nested property exists
      if (aValue === undefined || bValue === undefined) {
        return 0; // or handle the case where the property is missing
      }
  
      // Compare values based on type
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        // Numeric comparison
        return (aValue - bValue) * this.sortOrder;
      } else {
        // String comparison
        const stringCompare = aValue.localeCompare(bValue, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
        return stringCompare * this.sortOrder;
      }
    };
  }

  /**
   * Gets the value of a nested property in an object.
   * @param object - The object containing the nested property.
   * @param property - The nested property (supports dot notation for nested properties).
   * @returns The value of the nested property, or undefined if the property is not found.
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
