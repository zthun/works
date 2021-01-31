/* istanbul ignore file */

/**
 * Represents sample data for a typedoc sample class.
 */
export interface IZTypedocSampleData {
  /**
   * The value of the data.
   */
  value: string;
}

/**
 * Another type of sample data.
 */
export interface IZTypedocSampleDataType {
  /**
   * The data type name.
   */
  type?: string;
}

/**
 * Prefix for sample matrix.
 */
export type ZSampleMatrixPrefix = 'foo' | 'bar';

/**
 * Suffix for sample matrix.
 */
export type ZSampleMatrixSuffix = 'boo' | 'far';

/**
 * Represents a sample class that contains all aspects of typedoc.
 *
 * You should never inherit or create an instance of this object.  This object
 * will be deleted once it is no longer needed and is solely here to debug
 * and test the different types of typedoc.
 */
export abstract class ZTypedocSample<T> {
  /**
   * A readonly constant.
   */
  public static readonly Glob = 3000;

  /**
   * A intrinsic property.
   *
   * This one represents a boolean.
   */
  public intrinsic = true;

  /**
   * A rest type.
   */
  public rester: [number, ...string[]] = [1, 'abc', 'def', 'ghi'];

  /**
   * An index access type.
   */
  public indexAccess: (IZTypedocSampleData & IZTypedocSampleDataType)['value' | 'type'];

  /**
   * A type property.
   *
   * Can be a multitude of types.
   */
  public data: T = null;

  /**
   * A reference property with a non public accessor.
   */
  protected reference: IZTypedocSampleData = { value: '0' };

  /**
   * A conditional property
   */
  public conditional: T extends IZTypedocSampleData ? IZTypedocSampleData : string = null;

  /**
   * Union type property.
   */
  public union: number | boolean | 'auto' = null;

  /**
   * Intersection type property.
   */
  public intersection: IZTypedocSampleData & IZTypedocSampleDataType = null;

  /**
   * A mapped type property.
   */
  public mapped: { readonly [P in keyof T]: T[P] };

  /**
   * A mapped type property.
   */
  public partial: { [P in keyof T]?: T[P] };

  /**
   * A tuple type property with optionals.
   */
  public tuple: [number, number, number?, string?];

  /**
   * A getter that returns the protected reference.
   *
   * @returns The reference field.
   */
  public get ref() {
    return this.reference;
  }

  /**
   * A setter that sets the protected reference.
   *
   * @param val The value to set.
   */
  public set ref(val: IZTypedocSampleData) {
    this.reference = val;
  }

  /**
   * A getter that returns a query property.
   */
  public get query() {
    return typeof this.data;
  }

  /**
   * A template literal property.
   *
   * Requires typescript 4.1
   */
  public template: `${ZSampleMatrixPrefix}-${ZSampleMatrixSuffix}`;

  /**
   * A method with parameters.
   *
   * @param paramA Sample intrinsic parameter.
   * @param paramB Sample reflection parameter.
   * @param paramC Sample array parameter.
   * @param paramD Sample reference parameter with generics.
   *
   * @returns Some nonsensical string.
   */
  public method(paramA: string, paramB: (foo: number) => void, paramC: IZTypedocSampleData[], paramD: Array<Array<IZTypedocSampleData>>) {
    return `${paramA}, ${paramB}, ${paramC} ${paramD}`;
  }

  /**
   * Returns val.
   *
   * @param val The value to return.
   *
   * @returns val
   */
  public multi(val: string): string;

  /**
   * Returns the sum of val and second as a string.
   *
   * @param val The first number.
   * @param second The second number
   *
   * @returns val + second as a string.
   */
  public multi(val: number, second: number): string;

  /**
   * Returns val as a string.
   *
   * @param val The value to return.
   * @param second The second value.
   *
   * @returns The string value or the sum of val and number if val and second are passed.
   */
  public multi(val: string | number, second?: number): string {
    return typeof val === 'string' ? val : String(val + second);
  }

  /**
   * A static method with one typed parameter.
   *
   * @param arg Some type argument.
   * @param other Optional argument.
   *
   * @returns Whatever it feels like.
   *
   * @example const shouldBeThree = ZTypedocSample.static(3);
   */
  public static static<T extends IZTypedocSampleData, T2>(arg: T, other?: T2[]) {
    return arg ? [arg] : other;
  }

  /**
   * A method that takes any number of arguments.
   *
   * @param arg The first argument.
   * @param args The arguments.
   *
   * @returns args as an array
   */
  public rest(arg: any, ...args: any[]) {
    return [].concat([arg]).concat(args);
  }

  /**
   * A predicate method.
   *
   * Useful for type guards.
   *
   * @param other The object to check.
   *
   * @returns A predicate statement that determines if other implements IZTypedocSampleData.
   */
  public predicate(other: any): other is IZTypedocSampleData {
    return Object.prototype.hasOwnProperty.call(other, 'value');
  }
}
