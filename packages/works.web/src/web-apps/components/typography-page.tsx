// cspell:disable
import AbcIcon from '@mui/icons-material/Abc';
import { ZCaption, ZCard, ZH1, ZH2, ZH3, ZH4, ZH5, ZH6, ZOverline, ZParagraph, ZSubtitle } from '@zthun/works.react';
import React from 'react';

/**
 * Represents a demo for typography.
 *
 * @returns The JSX to render the typography demo page.
 */
export function ZTypographyPage() {
  return (
    <ZCard
      className='ZTypographyPage-root'
      heading={'Typography'}
      subHeading='Standard page structures'
      avatar={<AbcIcon color='success' fontSize='inherit' />}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Typography is the concept of a document outline. HTMl essentially has this built in with different tags, such as
        &lt;p&gt;. The main reason to use custom typography in your applications is for responsiveness. As you shrink
        and resize the window, or if users access your page on small devices, you want the page to respond to changes
        made.
      </ZParagraph>

      <ZH1>Headline 1</ZH1>
      <ZH2>Headline 2</ZH2>
      <ZH3>Headline 3</ZH3>
      <ZH4>Headline 4</ZH4>
      <ZH5>Headline 5</ZH5>
      <ZH6>Headline 6</ZH6>

      <hr />
      <ZParagraph>
        Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Nec dui nunc mattis enim. Velit laoreet id donec ultrices tincidunt arcu. In mollis nunc
        sed id semper. Aliquet lectus proin nibh nisl condimentum id venenatis. Convallis aenean et tortor at risus.
        Fringilla phasellus faucibus scelerisque eleifend. Eu sem integer vitae justo eget magna fermentum iaculis eu.
        Enim sit amet venenatis urna cursus. Nisl suscipit adipiscing bibendum est ultricies integer. In hendrerit
        gravida rutrum quisque non tellus. Adipiscing tristique risus nec feugiat in fermentum posuere urna nec. Quam
        adipiscing vitae proin sagittis nisl rhoncus.
      </ZParagraph>

      <hr />
      <ZSubtitle>
        Subtitle: Pulvinar elementum integer enim neque volutpat ac. Ullamcorper a lacus vestibulum sed. Risus pretium
        quam vulputate dignissim suspendisse in est ante.
      </ZSubtitle>

      <hr />
      <ZCaption>Caption: Viverra maecenas accumsan lacus vel facilisis volutpat est.</ZCaption>

      <hr />
      <ZOverline>Overline: Pretium quam vulputate dignissim suspendisse.</ZOverline>
    </ZCard>
  );
}
