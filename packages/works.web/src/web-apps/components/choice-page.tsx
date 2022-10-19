import BalanceIcon from '@mui/icons-material/Balance';
import TouchAppIcon from '@mui/icons-material/TouchApp';

import {
  useSafeState,
  ZBooleanSwitch,
  ZChoiceAutocomplete,
  ZChoiceDropDown,
  ZGridLayout,
  ZLineItemLayout,
  ZPaperCard,
  ZStateSize
} from '@zthun/works.react';
import React from 'react';

interface Superhero {
  id: string;
  alias: string;
  name: string;
}

const Superheroes: Superhero[] = [
  { id: 'batman', alias: 'Batman', name: 'Bruce Wayne' },
  { id: 'superman', alias: 'Superman', name: 'Clark Kent' },
  { id: 'wonder-woman', alias: 'Wonder Woman', name: 'Diana Prince' },
  { id: 'green-lantern', alias: 'Green Lantern', name: 'Hal Jordan' },
  { id: 'cyborg', alias: 'Cyborg', name: 'Vic Stone' },
  { id: 'constantine', alias: 'Constantine', name: 'John Constantine' }
];

/**
 * Represents the tutorial for how to get started.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZChoicePage() {
  const [values, setValues] = useSafeState([Superheroes[2].id]);
  const [disabled, setDisabled] = useSafeState(false);
  const [multiple, setMultiple] = useSafeState(false);
  const [indelible, setIndelible] = useSafeState(false);

  /**
   * Renders the selected items.
   *
   * @returns
   *        The JSX that renders the selected items.
   */
  function renderSelected() {
    return values.map((s) => <li key={s}>{s}</li>);
  }

  /**
   * Renders a superhero.
   *
   * @param h
   *        The hero to render.
   *
   * @returns
   *        The JSX to render the superhero.
   */
  function renderSuperhero(h: Superhero) {
    return (
      <ZLineItemLayout
        className='ZChoicePage-hero'
        prefix={<BalanceIcon fontSize='inherit' />}
        body={getHeroDisplay(h)}
      />
    );
  }

  /**
   * Gets the identifier value of a superhero.
   *
   * @param h
   *        The hero to identity.
   *
   * @returns
   *        The hero identity.
   */
  function getHeroIdentity(h: Superhero) {
    return h.id;
  }

  /**
   * Gets the display for a hero.
   *
   * @param h
   *        The hero to display.
   *
   * @returns
   *        The display name for the hero.
   */
  function getHeroDisplay(h: Superhero) {
    return `${h.alias} (${h.name})`;
  }

  return (
    <ZPaperCard
      className='ZChoicePage-root'
      headerText='Choice'
      subHeaderText='Select from a list of options.'
      avatar={<TouchAppIcon color='warning' fontSize='inherit' />}
    >
      <h2>Drop Down</h2>
      <ZChoiceDropDown
        disabled={disabled}
        label='Hero'
        indelible={indelible}
        multiple={multiple}
        value={values}
        identifier={getHeroIdentity}
        display={getHeroDisplay}
        onValueChange={setValues}
        options={Superheroes}
        renderOption={renderSuperhero}
      />

      <h2>Autocomplete</h2>
      <ZChoiceAutocomplete
        disabled={disabled}
        label='Hero'
        indelible={indelible}
        multiple={multiple}
        value={values}
        identifier={getHeroIdentity}
        display={getHeroDisplay}
        onValueChange={setValues}
        options={Superheroes}
        renderOption={renderSuperhero}
      />

      <h2>Options</h2>
      <ZGridLayout gap={ZStateSize.Small}>
        <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' />
        <ZBooleanSwitch value={multiple} onValueChange={setMultiple} label='Multiple' />
        <ZBooleanSwitch value={indelible} onValueChange={setIndelible} label='Indelible' />
      </ZGridLayout>

      <h2>Selected</h2>
      <ul>{renderSelected()}</ul>
    </ZPaperCard>
  );
}
