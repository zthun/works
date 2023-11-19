import { ZCard, ZGridView, ZImageSource, ZParagraph, ZStack } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { IZProject } from '@zthun/works-portfolio';
import React from 'react';
import { useProjectsService } from './projects-service';

export function ZProjectsPage() {
  const projects = useProjectsService();
  const renderProject = (project: IZProject) => (
    <ZCard className='ZProjectsPage-project' heading={project.name} name={project._id}>
      <ZStack gap={ZSizeFixed.Small}>
        <ZImageSource src={project.icon} height={ZSizeFixed.ExtraLarge} />
        <ZParagraph>{project.description}</ZParagraph>
      </ZStack>
    </ZCard>
  );

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
