import AbcIcon from '@mui/icons-material/Abc';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LoopIcon from '@mui/icons-material/Loop';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NumbersIcon from '@mui/icons-material/Numbers';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import TitleIcon from '@mui/icons-material/Title';
import TouchAppIcon from '@mui/icons-material/TouchApp';

import WarningIcon from '@mui/icons-material/Warning';
import { ZRouteOptionBuilder } from '@zthun/works.core';
import React from 'react';

export const ZComponentAlerts = new ZRouteOptionBuilder()
  .name('Alerts')
  .path('alerts')
  .description('User Feedback')
  .avatar(<WarningIcon color='warning' fontSize='large' />)
  .build();

export const ZComponentBoolean = new ZRouteOptionBuilder()
  .name('Boolean')
  .path('boolean')
  .description('Basic Togglers')
  .avatar(<CheckBoxIcon color='success' fontSize='large' />)
  .build();

export const ZComponentButton = new ZRouteOptionBuilder()
  .name('Button')
  .path('button')
  .description('Click To Activate')
  .avatar(<SmartButtonIcon color='error' fontSize='large' />)
  .build();

export const ZComponentChoice = new ZRouteOptionBuilder()
  .name('Choice')
  .path('choice')
  .description('Select From An Option List')
  .avatar(<TouchAppIcon color='warning' fontSize='large' />)
  .build();

export const ZComponentDrawer = new ZRouteOptionBuilder()
  .name('Drawer')
  .path('drawer')
  .description('Pop-Out Content')
  .avatar(<MenuOpenIcon color='success' fontSize='large' />)
  .build();

export const ZComponentList = new ZRouteOptionBuilder()
  .name('List')
  .path('list')
  .description('Showing Multiple Items')
  .avatar(<FormatListNumberedIcon color='info' fontSize='large' />)
  .build();

export const ZComponentNumber = new ZRouteOptionBuilder()
  .name('Number')
  .path('number')
  .description('Spinners and Sliders')
  .avatar(<NumbersIcon color='success' fontSize='large' />)
  .build();

export const ZComponentSuspense = new ZRouteOptionBuilder()
  .name('Suspense')
  .path('suspense')
  .description('Working In The Background')
  .avatar(<LoopIcon color='warning' fontSize='large' />)
  .build();

export const ZComponentText = new ZRouteOptionBuilder()
  .name('Text')
  .path('text')
  .description('Enter Some Strings')
  .avatar(<TitleIcon color='primary' fontSize='large' />)
  .build();

export const ZComponentTypography = new ZRouteOptionBuilder()
  .name('Typography')
  .path('typography')
  .description('Standard Page Structures')
  .avatar(<AbcIcon color='primary' fontSize='large' />)
  .build();

export const ZWebAppsComponents = [
  ZComponentAlerts,
  ZComponentBoolean,
  ZComponentButton,
  ZComponentChoice,
  ZComponentDrawer,
  ZComponentList,
  ZComponentNumber,
  ZComponentSuspense,
  ZComponentText,
  ZComponentTypography
];
