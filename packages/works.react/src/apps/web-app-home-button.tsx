import AppsIcon from '@mui/icons-material/Apps';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { cssClass } from '@zthun/works.core';

import { noop, startCase } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IZButton, ZButton } from '../buttons/button';
import { ZImageSource } from '../image/image-source';
import { asStateData, isStateErrored, isStateLoading } from '../state/use-async-state';
import { makeStyles } from '../theme/make-styles';
import { ZCaption, ZH1 } from '../typography/typography';
import { useWebApp } from './web-app-service';

/**
 * The properties for the web app home button.
 */
export interface IZWebAppHomeButton extends Omit<IZButton, 'label' | 'avatar' | 'onClick'> {
  /**
   * The application id to display the icon, name, and description for.
   */
  whoami: string;

  /**
   * The navigation route to go to when the button is clicked.
   */
  route?: string;

  /**
   * An event which occurs before the navigation.
   */
  onBeforeNavigate?(): any;

  /**
   * An event which occurs after the navigation happens.
   */
  onAfterNavigate?(): any;
}

const useWebAppHomeButtonStyles = makeStyles()((theme) => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    textAlign: 'left'
  },

  avatar: {
    height: '5rem',
    width: '5rem',
    marginRight: theme.sizing.gaps.sm,
    borderRadius: theme.rounding.circle,
    border: `${theme.sizing.thickness.xs} solid ${theme.palette.grey[200]}`,
    background: theme.palette.common.white,

    svg: {
      height: '5rem',
      width: '5rem'
    }
  }
}));

/**
 * Represents a special button that displays an app icon, name, and description
 * and navigates to the root route on click.
 *
 * @param props
 *        The properties for the home button.
 *
 * @returns
 *        The JSX for the home button.
 */
export function ZWebAppHomeButton(props: IZWebAppHomeButton) {
  const { className, whoami, route = '/', onBeforeNavigate = noop, onAfterNavigate = noop } = props;
  const [who] = useWebApp(whoami);
  const navigate = useNavigate();
  const { classes } = useWebAppHomeButtonStyles();
  const _className = cssClass('ZWebAppHomeButton-root', className);

  const handleClick = () => {
    onBeforeNavigate();
    navigate(route);
    onAfterNavigate();
  };

  const renderAvatar = () => {
    const className = cssClass('ZWebAppHomeButton-avatar', classes.avatar);

    if (isStateLoading(who)) {
      return <HourglassEmptyIcon className={className} fontSize='inherit' color='info' />;
    }

    if (isStateErrored(who)) {
      return <ErrorIcon className={className} fontSize='inherit' color='error' />;
    }

    if (!who.icon) {
      return <AppsIcon className={className} fontSize='inherit' color='success' />;
    }

    return <ZImageSource className={className} src={who.icon} />;
  };

  const renderLabel = () => {
    if (isStateLoading(who)) {
      return null;
    }

    const name = asStateData(who)?.name || startCase(whoami);
    const short = isStateErrored(who) ? who.message : who.short;

    return (
      <div className={`ZWebAppHomeButton-title ${classes.title}`}>
        <ZH1 className='ZWebAppHomeButton-name' compact>
          {name}
        </ZH1>
        <ZCaption className='ZWebAppHomeButton-description' compact>
          {short}
        </ZCaption>
      </div>
    );
  };

  return (
    <ZButton
      {...props}
      className={_className}
      avatar={renderAvatar()}
      label={renderLabel()}
      loading={isStateLoading(who)}
      onClick={handleClick}
    />
  );
}