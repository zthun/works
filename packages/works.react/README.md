# Description

The main component library for common react components across @zthun scoped projects.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Installation

This library has several dependencies. Follow the instructions for npm and yarn for the missing peer dependencies.

```sh
# NPM
npm install @zthun/works.react

# Yarn
yarn add @zthun/works.react
```

## Paper Card

![Paper Card](images/png/works.react.card.png)

The vast majority of the components in @zthun/works.react are built from a paper card. A paper card is a styled [Material UI Card](https://material-ui.com/components/cards/) component that sits on top of a [Material UI Paper](https://material-ui.com/components/paper/) component for a 3d effect.

The paper card is generally built using the following methodologies.

- The paper card should have a clear title with an icon.
- There should be a subtitle describing the card.
- There should be, at most, one primary action that the user can perform on the card.
- Dangerous actions, such as deletes, should require that the user confirm that they know the consequences of the action.

Given these rules, the remaining components are built on top of the paper card.

```ts
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { ZPaperCard } from '@zthun/works.react';
import { IZMyComponentProps } from './my-component.props.ts';

export function MyComponent(props: IZMyComponentProps) {
  return (
    <ZPaperCard
      className='MyComponent-root'
      headerText='My Component'
      subHeaderText='My Component Description'
      avatar={<AddIcon />}
      size='md'
    >
      Content for the PaperCard is here.
    </ZPaperCard>
  );
}
```

## Alerts

![Alert](images/png/works.react.alert.png)

Another major data structure that this package gives is the alert data structure. Alerts in @zthun scoped projects are lists of manageable [Material UI Alert](https://material-ui.com/components/alert/) components. Generally, these are placed in a [Material UI Snackbar](https://material-ui.com/components/snackbars/) at the root of the application. The combination of a Snackbar and an Alert List feel very similar to toast notifications.

The alerts component is usually stored in one place and you will use the AlertStack context service in order to add alerts to the stack. In this manner, you will not be using a direct component, but will be using a service to modify a component that is outside the component that needs to display an alert.

```ts
import React from 'react';
import { useAlertStack, ZAlertBuilder, ZPaperCard } from '@zthun/works.react';
import AnnouncementIcon from '@material-ui/icons/Announcement';

export function MyComponent() {
  const alerts = useAlertStack();

  function handleAlert() {
    const alert = new ZAlertBuilder()
      .success()
      .message('Yay!  Success alert')
      .header('Successful Alert')
      .build();
    alerts.add(alert);
  }

  return (
    <ZPaperCard
      className='MyComponent-root'
      headerText='Alert Sample'
      subHeaderText='Show a success alert'
      avatar={<AnnouncementIcon />}
      actionText='Show Alert'
      onAction={handleAlert}
    >
      Alerts can have varying severity, messages, and titles. Use them to notify
      your users that things are happening in your application as a result of
      their actions.
    </ZPaperCard>
  );
}
```

## Typedoc

![Typedoc](images/png/works.react.typedoc.png)

Documentation is treated as a first class citizen in the zthunworks system and thus, there are components that can be used to render [markdown](https://www.markdownguide.org/) and [typedoc](https://typedoc.org/) files straight to react. There are two main components for rendering these files.

- Use the **ZMarkdownViewer** component to render markdown text.
- Use the **ZTypedocViewerSource** component to render your typedoc.

Note that the ZMarkdownViewer component supports syntax highlighting of any language supported by [highlight.js](https://highlightjs.org/);

With these components, they already exist within a paper card component so you will want to have them separate of any paper card components you have.

```ts
import { Grid } from '@material-ui/core';
import { ZTypedocViewerSource } from '@zthun/works.react';
import React from 'react';

export function MyPage() {
  const pkg = 'works.core';
  const img = `images/svg/${pkg}.svg`;
  const src = `docs/${pkg}.typedoc.json`;

  const avatar = (
    <img className='ZPaperCard-avatar ZPaperCard-avatar-lg' src={img} />
  );

  return (
    <Grid
      container={true}
      spacing={3}
      className='ZApiPage-root'
      data-testid='ZApiPage-root'
      justify='center'
    >
      <Grid item={true}>
        <ZTypedocViewerSource src={src} avatar={avatar} />
      </Grid>
    </Grid>
  );
}
```
