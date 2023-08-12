import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import Terminal from '@mui/icons-material/Terminal';
import {
  ZButton,
  ZCard,
  ZGrid,
  ZImageSource,
  ZParagraph,
  ZSubtitle,
  createStyleHook,
  useFashionTheme,
  useNavigate
} from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { asStateData } from '@zthun/helpful-react';
import { useWebApp } from '@zthun/works.react';
import React from 'react';
import { ZRouteMicroservices } from '../routes';

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
  const navigate = useNavigate();
  const learn = asStateData(_learn);
  const { secondary } = useFashionTheme();

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

      <ZCard
        className={classes.section}
        width={ZSizeFixed.Large}
        avatar={<DensitySmallIcon fontSize='inherit' />}
        heading={ZRouteMicroservices.name}
        subHeading={ZRouteMicroservices.description}
        footer={
          <ZButton
            label='Get Started'
            onClick={() => navigate(ZRouteMicroservices.path)}
            fashion={secondary}
            name='microservices-get-started'
            outline
            width={ZSizeVaried.Full}
          />
        }
      >
        <ZGrid justifyContent='center'>
          <ZImageSource src='images/svg/nest.svg' height={ZSizeFixed.ExtraLarge} width={ZSizeFixed.ExtraLarge} />
        </ZGrid>

        <ZSubtitle className={classes.quote}>SOLID code is best.</ZSubtitle>

        <ZParagraph>
          Zthunworks uses microservices under the hood to ensure that functionality has less regressions between
          versions. Microservice architectures have advantages and disadvantages, but they follow a principle that is
          similar to the philosophy of how Zthunworks develops web applications. The smaller the better.
        </ZParagraph>

        <ZParagraph>
          A lot of places tout that they use microservices, when in reality, they simply use lots of distributed
          services that directly talk to one another. This is not a good way to do microservices as direct microservice
          communication is akin to creating coupled dependencies. You might as well deploy internet dlls and prey for
          the best. Instead, Zthunworks creates microservices that are isolated from each other using the Nest framework
          and their orchestration is left up to each application backend to determine the actual business logic.
        </ZParagraph>
      </ZCard>
    </div>
  );
}
