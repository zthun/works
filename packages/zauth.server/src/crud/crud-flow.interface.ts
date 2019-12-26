export interface IZCrudFlow<T> {
  collection(): string;
  validateCreate(template: T): Promise<T>;
  validateUpdate(original: T, template: Partial<T>): Promise<T>;
  validateRemove(pending: T): Promise<void>;
  sanitize(val: T): Promise<T>;
}
