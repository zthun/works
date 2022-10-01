import ClearIcon from '@mui/icons-material/Clear';
import { Chip, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import { castArray, first, isArray } from 'lodash';
import React, { ReactNode, useMemo } from 'react';
import { v4 } from 'uuid';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentStyle } from '../component/component-style.interface';
import { IZComponentValue } from '../component/component-value';
import { usePropState } from '../state/use-prop-state';
import { makeStyles } from '../theme/make-styles';

export interface IZChoice extends IZComponentDisabled, IZComponentStyle, IZComponentValue<Array<any>> {
  headerText: string;
  type?: 'select' | 'button-group';
  multiple?: boolean;
  indelible?: boolean;
  options: Array<any>;

  identifier?: (option: any) => string | number;
  renderValue?: (value: any) => ReactNode;
  renderOption?: (option: any) => ReactNode;
}

const useChoiceStyles = makeStyles()((theme) => {
  return {
    clear: {
      marginRight: `${theme.sizing.gaps.md} !important`
    },
    chip: {
      '&.MuiChip-root': {
        height: 'auto',
        marginRight: theme.sizing.gaps.xs
      }
    }
  };
});

/**
 * A component that can be used to select item values.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZChoice(props: IZChoice) {
  const {
    className,
    disabled,
    indelible,
    headerText,
    multiple,
    options,
    value,
    identifier,
    onValueChange,
    renderOption = _renderOption,
    renderValue = renderOption
  } = props;
  const [_value, _setValue] = usePropState(value, onValueChange);
  const labelId = useMemo(() => v4(), []);
  const styles = useChoiceStyles();
  const optionsLookup = useMemo(_getLookup, [options, identifier]);
  const selectClass = cssClass('ZChoice-root', className);

  /**
   * Gets the list of selected options.
   *
   * @returns
   *      The list of selected options.
   */
  function _getLookup() {
    const valueToOptionsMap = new Map<any, any>();
    options.forEach((op) => valueToOptionsMap.set(_identity(op), op));
    return valueToOptionsMap;
  }

  /**
   * Returns the value representation of an option.
   *
   * @param option
   *        The option to convert.
   *
   * @returns
   *        The value returned from identifier(option) if
   *        identifier is truthy, or option if it is falsy.
   */
  function _identity(option: any) {
    return identifier ? identifier(option) : option;
  }

  /**
   * Default way to render an option.
   *
   * @param option
   *        The option to render.
   *
   * @returns
   *        The string representation of the option.
   */
  function _renderOption(option: any) {
    return <>{String(option)}</>;
  }

  /**
   * Casts the value to either the first value in the array or the entire array if multiple is set.
   *
   * @returns _value if multiple is true, the first item in value if multiple is false.  Returns
   *          undefined if there are no selected values.
   */
  function castValue() {
    return multiple ? _value : first(value);
  }

  /**
   * Handles when the selection changes.
   *
   * @param event The selection change event.
   */
  function handleSelect(event: SelectChangeEvent<any>) {
    const selected = castArray(event.target.value);
    _setValue(selected);
  }

  /**
   * Renders the item that is currently selected.
   *
   * @param value The current value of the selector.
   *
   * @returns
   *      The JSX that renders the selected item.
   */
  function renderSelectedItem(value: any) {
    if (isArray(value)) {
      const className = cssClass(`ZChoice-chip`, styles.classes.chip);
      return value
        .map((v) => optionsLookup.get(v))
        .map((v, i) => <Chip className={className} key={i} label={renderValue(v)} />);
    }

    const option = optionsLookup.get(value);
    return renderValue(option);
  }

  /**
   * Renders the menu items.
   *
   * @returns The JSX that renders the underlying items.
   */
  function renderMenuItems() {
    const renderMenuItem = (option: any, i: number) => {
      const value = _identity(option);
      const key = identifier ? value : i;
      return (
        <MenuItem key={key} value={value}>
          {renderOption(option)}
        </MenuItem>
      );
    };

    return options.map(renderMenuItem);
  }

  /**
   * Renders the clear icon.
   *
   * @returns
   *        The JSX to render the clear button.
   */
  function renderClear() {
    const empty = !value?.length;

    if (empty || disabled || indelible) {
      return null;
    }

    const className = cssClass('ZChoice-clear', styles.classes.clear);

    return (
      <IconButton className={className} onClick={_setValue.bind(null, [])}>
        <ClearIcon />
      </IconButton>
    );
  }

  /**
   * Renders the component as a select drop down.
   *
   * @returns The JSX that describes the select.
   */
  function renderSelect() {
    const className = cssClass('ZChoice-select');
    return (
      <FormControl className={className} fullWidth>
        <InputLabel id={labelId}>{headerText}</InputLabel>
        <Select
          labelId={labelId}
          disabled={disabled}
          value={castValue()}
          label={headerText}
          multiple={multiple}
          onChange={handleSelect}
          renderValue={renderSelectedItem}
          endAdornment={renderClear()}
        >
          {renderMenuItems()}
        </Select>
      </FormControl>
    );
  }

  return <div className={selectClass}>{renderSelect()}</div>;
}
