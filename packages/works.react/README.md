# Description

This is the main component library for common react based components across @zthun scoped projects.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Installation

This library has several dependencies. Follow the instructions for npm and yarn for the missing peer dependencies.

```sh
# NPM
npm install @zthun/works.react

# Yarn
yarn add @zthun/works.react
```

You'll also want the themes package to make it look correct.

```sh
# NPM
npm install @zthun/works.themes
# Yarn
yarn add @zthun/works.themes
```

The best way to apply the themes package is to simply use webpack in your client application and import the package directly.

```less
// index.less
@import '~@zthun/works.themes';
```

After that, every component in the @zthun/works.react package will look like it does on [zthunworks.com](https://zthunworks.com).

Note that currently, the themes package is written in less. If you are using sass or css, you will want to import the css file instead of the less file.

```scss
@import '@zthun/works.themes/css/index';
```

## Paper Card

![Paper Card](images/png/works.react.card.png)

The vast majority of the components in @zthun/works.react are built from a **ZPaperCard**. A paper card is a styled [Material UI Card](https://material-ui.com/components/cards/) component that sits on top of a [Material UI Paper](https://material-ui.com/components/paper/) component for a 3d effect.

The paper card is generally built using the following methodologies.

- The paper card should have a clear title with an avatar icon.
- There should be a subtitle describing the card.
- There should be, at most, one primary action that the user can perform on the card.
- Dangerous actions, such as deletes, should require that the user confirm that they know the consequences of the action.

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

## Login and Profile

![Login and Profile](images/png/works.react.users.png)

There are several components for user management.

The first starts with login components. The root component is the **ZLoginTabs** component. This tab component contains all three of the main activities that users do when dealing with credentials.

1. Logging into their account.
1. Creating a new account.
1. Recovering their account.

```ts
import { Grid } from '@material-ui/core';
import { IZLogin } from '@zthun/works.core';
import { ZLoginTabs } from '@zthun/works.react';
import React, { useState } from 'react';

export function MyLoginPage() {
  function handleLogin(login: IZLogin) {
    // Login with user credentials
  }

  function handleCreate(login: IZLogin) {
    // Create a new account
  }

  function handleRecover(login: IZLogin) {
    // Recover password
  }

  return (
    <Grid container={true} spacing={3} justify='center'>
      <Grid item={true}>
        <ZLoginTabs
          onLoginCredentialsChange={handleLogin}
          onCreateCredentialsChange={handleCreate}
          onRecoverCredentialsChange={handleRecover}
        />
      </Grid>
    </Grid>
  );
}
```

If your user is already authenticated, then you can allow them to modify their profile using the **ZProfileForm** component. The profile form constructs a partial object that allows you to just send the necessary information that changes without having to deal with it on the server.

```ts
import { Grid } from '@material-ui/core';
import { IZProfile } from '@zthun/works.core';
import { ZProfileForm, useLoginState } from '@zthun/works.react';
import React from 'react';

export function ZProfilePage() {
  const loginState = useLoginState();

  function handleUpdateProfile(changes: IZProfile) {
    // Handle updates to profile here.
  }

  return (
    <Grid container spacing={3} justify='center'>
      <Grid item>
        <ZProfileForm
          profile={loginState.data}
          onProfileChange={handleUpdateProfile}
        />
      </Grid>
    </Grid>
  );
}
```

## Store

![Store](images/png/works.react.store.png)

The last major feature of this package is how zthunworks deals with global store. A lot of react developers are familiar with redux. The redux pattern is complicated and will add a lot of unnecessary code bloat to manage global state when the functional side of react comes with a great global state management tool called a context. Zthunworks combines this context object with rxjs to make a minimal code global state management system by defining objects that can be "watched."

Instead of having to create reducers and actions, you simply define an object interface that you want to watch for changes. You then combine it with the ZDataStateClass and the useWatchableState hook. The easiest global state object that changes is the users current profile state.

In general, a state has three possible values.

1. Undefined means that the state is currently loading.
1. Null means what it means in JavaScript; there is no value.
1. A defined object means the value has been loaded and is ready to be used.

The following example shows how to define a global state object that is compatible with the React system.

```ts
import React, { useState, useContext, createContext } from 'react';
import { IZProfile } from '@zthun/works.core';
import { IZDataState, ZDataState, useWatchableState } from '@zthun/works.react';

/**
 * Defines the context state for teh object.
 *
 * Note that the default will just be null here.
 * You must provide the refresh implementation at the
 * root of you application.
 */
export const ZLoginStateContext = createContext<IZDataState<IZProfile>>(
  new ZDataState<IZProfile>(null)
);

/**
 * Specifies a hook that returns the current value of the state.
 *
 * Use this when you don't need to watch for
 * changes to the object.
 */
export function useLogin(): IZDataState<IZProfile> {
  return useContext(ZLoginStateContext);
}

/**
 * Same as useLogin() but will cause
 * any component using it to redraw.
 */
export function useLoginState(): IZDataState<IZProfile> {
  const loginState = useLogin();
  return useWatchableState(loginState.data, loginState.dataChange, loginState);
}

/**
 * A component that doesn't re-render
 * when the object changes.
 */
export function MyComponentThatRefreshesTheState() {
  const login = useLogin();

  async function refreshLogin() {
    await login.refresh();
  }

  return <button onClick={refreshLogin} />;
}

/**
 * This component will re-render any
 * time the actual state is refreshed.
 */
export function MyComponent() {
  const login = useLoginState();

  const current = login.data;

  return <div>Current Login: {current.display} </div>;
}
```
