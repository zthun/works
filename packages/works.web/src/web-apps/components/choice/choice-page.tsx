import TouchAppIcon from '@mui/icons-material/TouchApp';

import { useSafeState, ZBoolean, ZChoice, ZGridLayout, ZPaperCard } from '@zthun/works.react';
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
    return `${h.alias} (${h.name})`;
  }

  /**
   * Returns the superhero shortname.
   *
   * @param h
   *        The superhero to render.
   *
   * @returns
   *        The JSX for rendering a shorthand superhero.
   */
  function renderSuperheroShorthand(h: Superhero) {
    return h.alias;
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

  return (
    <ZPaperCard className='ZChoicePage-root' headerText='Choice' subHeaderText='Select from a list of options' avatar={<TouchAppIcon color='warning' fontSize='large' />}>
      <ZChoice
        disabled={disabled}
        headerText='Hero'
        indelible={indelible}
        multiple={multiple}
        value={values}
        identifier={getHeroIdentity}
        onValueChange={setValues}
        options={Superheroes}
        renderOption={renderSuperhero}
        renderValue={renderSuperheroShorthand}
      />

      <h2>Options</h2>
      <ZGridLayout gap='xs'>
        <ZBoolean value={disabled} onValueChange={setDisabled} truthy='Disabled' />
        <ZBoolean value={multiple} onValueChange={setMultiple} truthy='Multiple' />
        <ZBoolean value={indelible} onValueChange={setIndelible} truthy='Indelible' />
      </ZGridLayout>

      <h2>Selected</h2>
      <ul>{renderSelected()}</ul>
    </ZPaperCard>
  );
}
