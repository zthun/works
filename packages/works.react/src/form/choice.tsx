import { first } from 'lodash';
import { ReactNode, useMemo } from 'react';
import { v4 } from 'uuid';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentValue } from '../component/component-value';
import { useAmbassadorState } from '../state/use-ambassador-state';

export interface IZChoiceOption<O, V> {
  key: string;
  value: V;
  option: O;
}

export interface IZChoice<O, V>
  extends IZComponentDisabled,
    IZComponentStyle,
    IZComponentValue<Array<V>>,
    IZComponentLabel,
    IZComponentName {
  multiple?: boolean;
  indelible?: boolean;
  options: Array<O>;

  identifier: (option: O) => V;
  display?: (option: O) => string;
  renderOption?: (option: O) => ReactNode;
}

export interface IZChoiceApi<O, V> {
  readonly choices: IZChoiceOption<O, V>[];
  readonly lookup: Map<O | V | string, IZChoiceOption<O, V>>;
  readonly value: V[] | undefined;

  cast(value: V[] | undefined, fallback: any): V | V[];
  display(option: O): string;
  render(option: O): ReactNode;
  setValue(value: V[]): void;
}

/**
 * Imports the common foundation for all choice components.
 *
 * @param props
 *        The properties for a choice component.
 *
 * @returns
 *        The API to render a choice component.
 */
export function useChoice<O = any, V = O>(props: IZChoice<O, V>): IZChoiceApi<O, V> {
  const { value, onValueChange, options, identifier, display = _display, multiple, renderOption = display } = props;

  const [_value, _setValue] = useAmbassadorState(value, onValueChange);
  const [choices, lookup] = useMemo(_choices, [options, identifier]);

  /**
   * Converts from the initial options to the option list with a lookup table.
   *
   * @returns
   *        A tuple with the first being the options list and the second being
   *        a lookup table to map keys to options.
   */
  function _choices(): [IZChoiceOption<O, V>[], Map<O | V | string, IZChoiceOption<O, V>>] {
    const optionList = options.map<IZChoiceOption<O, V>>((op) => ({
      key: v4(),
      value: identifier(op),
      option: op
    }));

    const lookup = new Map<O | V | string, IZChoiceOption<O, V>>();

    optionList.forEach((op) => {
      lookup.set(op.option, op);
      lookup.set(op.value, op);
      lookup.set(op.key, op);
    });

    return [optionList, lookup];
  }

  /**
   * Returns the default display text of an option.
   *
   * @param option
   *        The option to retrieve the display text for.
   *
   * @returns
   *        The option converted to a string.
   */
  function _display(option: O) {
    return String(option);
  }

  /**
   * Casts the value to the first value in the array or the array itself if multiple is on.
   *
   * @param value
   *        The value to cast or undefined if there is currently no value.
   * @param fallback
   *        The fallback value to use if value is undefined.
   *
   * @returns
   *        The empty array if value is undefined.  Value if multiple
   *        is true, or the first value in the array if multiple is false.
   *        Returns fallback if the array is empty and multiple is false.
   */
  function cast(value: V[] | undefined, fallback: any): V | V[] {
    const actual = value ?? [];
    const firstValue = first(actual) || fallback;
    return multiple ? actual : firstValue;
  }

  return {
    choices,
    lookup,
    value: _value,

    cast,
    display,
    render: renderOption,
    setValue: _setValue
  };
}
