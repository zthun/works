import {
  ZBox,
  ZButton,
  ZCard,
  ZGrid,
  ZGridView,
  ZIconFontAwesome,
  ZImage,
  ZParagraph,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { ZHorizontalAnchor } from "@zthun/helpful-fn";
import { useWindowService } from "@zthun/helpful-react";
import type { IZProject } from "@zthun/works-portfolio";
import {
  ZProjectKindDisplayMap,
  ZProjectKindFontAwesomeIconMap,
} from "@zthun/works-portfolio";

import { useProjectsService } from "./projects-service.mjs";

export function ZProjectsPage() {
  const projects = useProjectsService();
  const window = useWindowService();

  const open = (url: string) => {
    window.open(url, "_blank");
  };

  const renderProject = (project: IZProject) => {
    const { _id, kind, name, url, source } = project;
    const [icon, family] = ZProjectKindFontAwesomeIconMap[kind];
    const display = ZProjectKindDisplayMap[kind];

    const footer = (
      <ZGrid gap={ZSizeFixed.Small} columns="1fr auto" width={ZSizeVaried.Full}>
        <ZButton
          label="Check it out"
          avatar={
            <ZIconFontAwesome
              name="person-walking-arrow-right"
              width={ZSizeFixed.Small}
            />
          }
          width={ZSizeVaried.Full}
          onClick={open.bind(null, url)}
          name="url"
        />
        <ZButton
          label={
            <ZIconFontAwesome
              name="github"
              family="brands"
              width={ZSizeFixed.Small}
            />
          }
          onClick={open.bind(null, source)}
          name="source"
        />
      </ZGrid>
    );

    return (
      <ZCard
        key={_id}
        className="ZProjectsPage-project"
        TitleProps={{
          avatar: (
            <ZIconFontAwesome
              name={icon}
              family={family}
              width={ZSizeFixed.Small}
            />
          ),
          heading: name,
          subHeading: display,
        }}
        name={_id}
        footer={footer}
      >
        <ZStack gap={ZSizeFixed.Small}>
          <ZBox
            width={ZSizeVaried.Full}
            justification={ZHorizontalAnchor.Center}
          >
            <ZImage
              src={project.icon}
              height={{ xl: ZSizeFixed.ExtraLarge, sm: ZSizeFixed.Large }}
            />
          </ZBox>
          <ZParagraph>{project.description}</ZParagraph>
        </ZStack>
      </ZCard>
    );
  };

  return (
    <ZGridView
      className="ZProjectsPage-root"
      dataSource={projects}
      GridProps={{
        gap: ZSizeFixed.Small,
        columns: {
          xl: "1fr 1fr 1fr 1fr",
          lg: "1fr 1fr 1fr",
          md: "1fr 1fr",
          sm: "1fr",
        },
      }}
      renderItem={renderProject}
    />
  );
}
