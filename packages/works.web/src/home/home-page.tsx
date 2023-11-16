import Terminal from '@mui/icons-material/Terminal';
import { ZCard, ZGrid, ZImageSource, ZParagraph, ZSubtitle, createStyleHook } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { asStateData } from '@zthun/helpful-react';
import { useWebApp } from '@zthun/works.react';
import React from 'react';

const useHomePageStyles = createStyleHook(({ tailor }) => ({
  section: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: tailor.gap()
  },
  quote: {
    textAlign: 'center',
    backgroundColor: '#eee',
    border: `${tailor.thickness()} solid #aaa`,
    padding: tailor.gap(),
    marginTop: tailor.gap(),
    marginBottom: tailor.gap()
  }
}));

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZHomePage() {
  const [_learn] = useWebApp('learn');
  const { classes } = useHomePageStyles();
  const learn = asStateData(_learn);

  return (
    <div className='ZHomePage-root'>
      <ZCard
        className={classes.section}
        width={ZSizeFixed.Large}
        avatar={<Terminal fontSize='inherit' />}
        heading='The Works System'
        subHeading='Make development easier'
      >
        <ZGrid justifyContent='center'>
          <ZImageSource src={learn?.icon} height={ZSizeFixed.ExtraLarge} width={ZSizeFixed.ExtraLarge} />
        </ZGrid>

        <ZSubtitle className={classes.quote}>Users perform at their best when they have absolute focus.</ZSubtitle>

        <ZParagraph>
          Zthunworks is an application management system that is used to make building tiny applications easier. Tiny
          applications have the ability to work together but are independent by definition. One of the best examples of
          taking a Monolith application and converting it down to smaller pieces was iTunes by Apple. While iTunes was
          excellent for playing and managing music, the features to manage movies and photos was out of place and caused
          iTunes to become very bloated with features. Apple eventually split the Monolith into Music, Photos, Podcasts,
          Books and TV.
        </ZParagraph>

        <ZParagraph>
          The works system is built around this philosophy, in that users do their best when they are focused on just a
          single task at a time. Thus, the works system builds tiny subsystems and components to help create a suite of
          applications to do everyday things.
        </ZParagraph>
      </ZCard>
    </div>
  );
}
