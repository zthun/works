import { ZSizeFixed } from '@zthun/works.chonkify';
import { ZCard, ZImageSource, ZParagraph } from '@zthun/works.react';
import React from 'react';

/**
 * Represents the tutorial for how to get started.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZGettingStartedPage() {
  const avatar = <ZImageSource src='images/svg/react.svg' height={ZSizeFixed.Medium} width={ZSizeFixed.Medium} />;

  return (
    <ZCard
      className='ZGettingStartedPage-root'
      avatar={avatar}
      heading='Web Apps'
      subHeading='Develop Something For Users'
    >
      <ZParagraph>
        Users interact with your web applications through user interfaces. You can develop a great API that is perfectly
        scalable and clean, but unless there is a friendly way to interact with it, most users will never know about it.
        This is why developing a solid front end is so important. Front ends allow your users to use your system without
        needing to know all of the backend implementation that goes into it.
      </ZParagraph>
    </ZCard>
  );
}
