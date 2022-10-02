import ClearIcon from '@mui/icons-material/Clear';
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import { castArray, first, isArray } from 'lodash';
import React, { ReactNode, useMemo } from 'react';
import { v4 } from 'uuid';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentStyle } from '../component/component-style.interface';
import { IZComponentValue } from '../component/component-value';
import { usePropState } from '../state/use-prop-state';
import { makeStyles } from '../theme/make-styles';

interface IZChoiceOption {
  key: string | number;
  option: any;
}

export enum ZChoiceType {
  DropDown = 'drop-down',
  ButtonGroup = 'button-group'
}

export interface IZChoice extends IZComponentDisabled, IZComponentStyle, IZComponentValue<Array<any>> {
  headerText: string;
  type?: ZChoiceType;
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
      'display': 'inline-flex',
      'flexWrap': 'wrap',

      '.ZChoice-value': {
        fontSize: theme.sizing.font.sm,
        backgroundColor: theme.palette.grey[600],
        color: theme.palette.common.white,
        borderRadius: theme.rounding.chip,
        paddingLeft: theme.sizing.gaps.sm,
        paddingRight: theme.sizing.gaps.sm,
        marginRight: theme.sizing.gaps.xs,
        marginBottom: theme.sizing.gaps.xs
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
    type = ZChoiceType.DropDown,
    value,
    identifier,
    onValueChange,
    renderOption = _renderOption,
    renderValue = renderOption
  } = props;
  const [_value, _setValue] = usePropState(value, onValueChange);
  const labelId = useMemo(() => v4(), []);
  const styles = useChoiceStyles();
  const [_options, _lookup] = useMemo(_convertOptions, [options, identifier]);
  const selectClass = cssClass('ZChoice-root', className);

  /**
   * Converts from the initial options to the option list with a lookup table.
   *
   * @returns
   *        A tuple with the first being the options list and the second being
   *        a lookup table to map keys to options.
   */
  function _convertOptions(): [IZChoiceOption[], Map<any, IZChoiceOption>] {
    const optionList = options.map<IZChoiceOption>((op) => ({
      key: identifier == null ? v4() : identifier(op),
      option: op
    }));

    const lookup = new Map<any, any>();
    optionList.forEach((op) => {
      lookup.set(op.option, op);
      lookup.set(op.key, op);
    });

    return [optionList, lookup];
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
   * @returns
   *        _value if multiple is true, the first item in value if multiple is false.  Returns
   *        undefined if there are no selected values.
   */
  function castValue() {
    const actual = _value == null ? [] : _value;
    const firstValue = first(actual) || '';
    return multiple ? actual : firstValue;
  }

  /**
   * Handles when the selection changes.
   *
   * @param event
   *        The selection change event.
   */
  function handleSelect(event: SelectChangeEvent<any>) {
    const selected = castArray(event.target.value);
    _setValue(selected);
  }

  /**
   * Renders the item that is currently selected.
   *
   * @param value
   *        The current value of the selector.
   *
   * @returns
   *        The JSX that renders the selected item.
   */
  function renderSelectedItem(value: any) {
    const _renderSelected = (option: IZChoiceOption | undefined) => (
      <div className='ZChoice-value' key={option?.key} data-value={option?.key}>
        {renderValue(option?.option || value)}
      </div>
    );

    if (isArray(value)) {
      const className = cssClass('ZChoice-chip-list', styles.classes.chip);
      return (
        <div className={className}>{value.map((v) => _lookup.get(v)).map((option) => _renderSelected(option))}</div>
      );
    }

    const option = _lookup.get(value);
    return _renderSelected(option);
  }

  /**
   * Renders the menu items.
   *
   * @returns
   *        The JSX that renders the underlying items.
   */
  function renderMenuItems() {
    const renderMenuItem = (option: IZChoiceOption) => {
      const value = _identity(option.option);
      const { key } = option;

      return (
        <MenuItem className='ZChoice-select-menu' key={key} value={value}>
          <div className='ZChoice-option' data-value={key}>
            {renderOption(option.option)}
          </div>
        </MenuItem>
      );
    };

    return _options.map(renderMenuItem);
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
   * @returns
   *        The JSX that describes the select.
   */
  function renderChoice() {
    return (
      <FormControl fullWidth>
        <InputLabel className='ZChoice-label' id={labelId}>
          {headerText}
        </InputLabel>
        <Select
          className='ZChoice-select-drop-down'
          labelId={labelId}
          disabled={disabled}
          value={castValue()}
          label={headerText}
          multiple={multiple}
          MenuProps={{ className: 'ZChoice-select-menu' }}
          onChange={handleSelect}
          renderValue={renderSelectedItem}
          endAdornment={renderClear()}
        >
          {renderMenuItems()}
        </Select>
      </FormControl>
    );
  }

  return (
    <div className={selectClass} data-type={type}>
      {renderChoice()}
    </div>
  );
}
