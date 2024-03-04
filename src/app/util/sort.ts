export class Sort {
  private sortOrder = 1;
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  constructor() {}

  public startSort(property: string, order: string) {
    if (order === 'desc') {
      this.sortOrder = -1;
    } else {
      this.sortOrder = 1; // Ensure sortOrder is reset for ascending order
    }
    return (a: any, b: any) => {
      // Handle nested properties
      const aValue = this.getPropertyValue(a, property);
      const bValue = this.getPropertyValue(b, property);
      return this.collator.compare(aValue, bValue) * this.sortOrder;
    };
  }

  // Handle special case of the customer nested key
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
