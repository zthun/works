import BalanceIcon from '@mui/icons-material/Balance';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { ZSizeFixed } from '@zthun/works.core';

import {
  useSafeState,
  ZBooleanSwitch,
  ZCaption,
  ZCard,
  ZChoiceAutocomplete,
  ZChoiceDropDown,
  ZGridLayout,
  ZH3,
  ZLineItemLayout,
  ZPaddedBox,
  ZParagraph
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
    <ZCard
      className='ZChoicePage-root'
      heading='Choice'
      subHeading='Select from a list of options.'
      avatar={<TouchAppIcon color='warning' fontSize='inherit' />}
    >
      <ZPaddedBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZPaddedBox padding={{ bottom: ZSizeFixed.Large }}>
          <ZParagraph compact>
            Choices help the user with valid values. When the user has to pick between a list of multiple choice
            options, then a choice component is appropriate. There are multiple variations of making choices, but all of
            them have the same premise. Given a list of possible values to choose from, you can select one or more
            values.
          </ZParagraph>
        </ZPaddedBox>

        <ZGridLayout alignItems='center' columns='1fr 1fr' gap={ZSizeFixed.Large}>
          <ZChoiceDropDown
            disabled={disabled}
            label='Drop Down'
            indelible={indelible}
            multiple={multiple}
            value={values}
            identifier={getHeroIdentity}
            display={getHeroDisplay}
            onValueChange={setValues}
            options={Superheroes}
            renderOption={renderSuperhero}
          />

          <ZChoiceAutocomplete
            disabled={disabled}
            label='Autocomplete'
            indelible={indelible}
            multiple={multiple}
            value={values}
            identifier={getHeroIdentity}
            display={getHeroDisplay}
            onValueChange={setValues}
            options={Superheroes}
            renderOption={renderSuperhero}
          />
        </ZGridLayout>

        <ZPaddedBox padding={{ top: ZSizeFixed.Medium }}>
          <ZCaption compact>Selected</ZCaption>
          <ul>{renderSelected()}</ul>
        </ZPaddedBox>
      </ZPaddedBox>

      <ZPaddedBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGridLayout gap={ZSizeFixed.Small}>
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' />
          <ZBooleanSwitch value={multiple} onValueChange={setMultiple} label='Multiple' />
          <ZBooleanSwitch value={indelible} onValueChange={setIndelible} label='Indelible' />
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
