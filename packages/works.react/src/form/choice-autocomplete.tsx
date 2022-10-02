import { Autocomplete, AutocompleteRenderInputParams, TextField } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import { castArray, first } from 'lodash';
import React, { HTMLAttributes, SyntheticEvent } from 'react';
import { makeStyles } from '../theme/make-styles';
import { IZChoice, IZChoiceOption, useChoice } from './choice';

const useChoiceAutocompleteStyles = makeStyles()((theme) => {
  return {
    root: {
      '.MuiSelect-select': {
        padding: theme.sizing.gaps.sm
      }
    }
  };
});

/**
 * Represents a choice object that implements an autocomplete.
 *
 * @param props
 *        The properties for the autocomplete component.
 *
 * @returns
 *        The JSX to render the choice component.
 */
export function ZChoiceAutocomplete<O, V>(props: IZChoice<O, V>) {
  const { className, label, disabled, multiple, identifier } = props;
  const { choices, value, lookup, render, display, setValue } = useChoice(props);
  const styles = useChoiceAutocompleteStyles();

  const handleSelect = (_: SyntheticEvent<any>, value: IZChoiceOption<O, V> | IZChoiceOption<O, V>[]) => {
    const selected = castArray(value);
    const values = selected.map((ch) => identifier(ch.option));
    setValue(values);
  };

  const actual = value ?? [];
  const chosen = actual.map((v) => lookup.get(v));
  const choice = multiple ? chosen : first(chosen) || null;

  /**
   * Gets the appropriate label for the chosen option.
   *
   * @param ch
   *        The current choice object.
   *
   * @returns
   *        The react node to render the choice.
   */
  function getOptionLabel(ch: IZChoiceOption<O, V>) {
    return ch == null ? '' : display(ch.option);
  }

  /**
   * An equality method to compare an option to a value.
   *
   * @param o
   *        The option to compare with.
   * @param v
   *        The value to compare against.
   *
   * @returns
   *        True if o and v are equivalent.  False otherwise.
   */
  function isOptionEqualToValue(o: IZChoiceOption<O, V>, v: IZChoiceOption<O, V>) {
    return o.value === v.value;
  }

  /**
   * Renders an option in the auto complete.
   *
   * @param props
   *        The properties for the li element to be rendered.
   * @param v
   *        The option being rendered.
   *
   * @returns
   *        The react node that renders the option.
   */
  function renderOption(props: HTMLAttributes<HTMLLIElement>, v: IZChoiceOption<O, V>) {
    return <li {...props}>{render(v.option)}</li>;
  }

  /**
   * Renders the text field component that holds the value.
   *
   * @param props
   *        The text field properties
   *
   * @returns
   *        The react node that renders the text field.
   */
  function renderInput(props: AutocompleteRenderInputParams) {
    return <TextField {...props} label={label} />;
  }

  return (
    <Autocomplete
      className={cssClass('ZChoice-root', 'ZChoice-autocomplete', styles.classes.root, className)}
      autoHighlight
      disabled={disabled}
      options={choices}
      value={choice}
      onChange={handleSelect}
      multiple={multiple}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
}
