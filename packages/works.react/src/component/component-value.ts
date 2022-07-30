export interface IZComponentValue<T> {
  value?: T;
  onValueChange?: (val: T) => void;
}
