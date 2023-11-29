import {
  ZBox,
  ZButton,
  ZCard,
  ZGrid,
  ZGridView,
  ZIconFontAwesome,
  ZImageSource,
  ZParagraph,
  ZStack
} from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { ZHorizontalAnchor } from '@zthun/helpful-fn';
import { useWindowService } from '@zthun/helpful-react';
import { IZProject, ZProjectKindDisplayMap, ZProjectKindFontAwesomeIconMap } from '@zthun/works-portfolio';
import React from 'react';
import { useProjectsService } from './projects-service';

export function ZProjectsPage() {
  const projects = useProjectsService();
  const window = useWindowService();

  const open = (url: string) => {
    window.open(url, '_blank');
  };

  const renderProject = (project: IZProject) => {
    const { _id, kind, name, url, source } = project;
    const [icon, family] = ZProjectKindFontAwesomeIconMap[kind];
    const display = ZProjectKindDisplayMap[kind];

    const footer = (
      <ZGrid gap={ZSizeFixed.Small} columns='1fr auto' width={ZSizeVaried.Full}>
        <ZButton
          label='Check it out'
          avatar={<ZIconFontAwesome name='person-walking-arrow-right' width={ZSizeFixed.Small} />}
          width={ZSizeVaried.Full}
          onClick={open.bind(null, url)}
          name='url'
        />
        <ZButton
          label={<ZIconFontAwesome name='github' family='brands' width={ZSizeFixed.Small} />}
          onClick={open.bind(null, source)}
          name='source'
        />
      </ZGrid>
    );

    return (
      <ZCard
        key={_id}
        className='ZProjectsPage-project'
        avatar={<ZIconFontAwesome name={icon} family={family} width={ZSizeFixed.Small} />}
        heading={name}
        subHeading={display}
        name={_id}
        footer={footer}
      >
        <ZStack gap={ZSizeFixed.Small}>
          <ZBox width={ZSizeVaried.Full} justification={ZHorizontalAnchor.Center}>
            <ZImageSource src={project.icon} height={ZSizeFixed.ExtraLarge} heightSm={ZSizeFixed.Large} />
          </ZBox>
          <ZParagraph>{project.description}</ZParagraph>
        </ZStack>
      </ZCard>
    );
  };

  return (
    <ZGridView
      className='ZProjectsPage-root'
      dataSource={projects}
      GridProps={{
        gap: ZSizeFixed.Small,
        columns: '1fr 1fr 1fr 1fr',
        columnsLg: '1fr 1fr 1fr',
        columnsMd: '1fr 1fr',
        columnsSm: '1fr'
      }}
      renderItem={renderProject}
    />
  );
}
