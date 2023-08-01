import AppsIcon from '@mui/icons-material/Apps';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { ZSizeFixed } from '@zthun/fashion-tailor';

import {
  IZButton,
  IZComponentStyle,
  ZButton,
  ZCaption,
  ZH1,
  ZImageSource,
  createStyleHook,
  useNavigate
} from '@zthun/fashion-boutique';
import { white } from '@zthun/fashion-theme';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { asStateData, isStateErrored, isStateLoading } from '@zthun/helpful-react';
import { startCase } from 'lodash';
import React from 'react';
import { useWebApp } from './web-app-service';

/**
 * The properties for the web app home button.
 */
export interface IZWebAppHomeButton extends IZComponentStyle {
  /**
   * The application id to display the icon, name, and description for.
   */
  whoami: string;

  /**
   * The navigation route to go to when the button is clicked.
   */
  route?: string;

  /**
   * Props for the underlying button component.
   */
  ButtonProps?: Omit<IZButton, 'avatar' | 'label' | 'loading' | 'onClick'>;
}

const useWebAppHomeButtonStyles = createStyleHook(({ device, tailor }) => ({
  title: {
    [device.break(ZSizeFixed.Small)]: {
      display: 'none'
    },
    textAlign: 'left'
  },

  avatar: {
    height: '4rem',
    width: '4rem',
    marginRight: tailor.gap(),
    borderRadius: '50%',
    border: `${tailor.thickness()} solid #eee`,
    background: white(),

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
  const { className, whoami, route = '/', ButtonProps } = props;
  const [who] = useWebApp(whoami);
  const navigate = useNavigate();
  const { classes } = useWebAppHomeButtonStyles();
  const _className = cssJoinDefined('ZWebAppHomeButton-root', className);
  const _buttonClassName = cssJoinDefined('ZWebAppHomeButton-button', ButtonProps?.className);

  const renderAvatar = () => {
    const className = cssJoinDefined('ZWebAppHomeButton-avatar', classes.avatar);

    if (isStateLoading(who)) {
      return <HourglassEmptyIcon className={className} fontSize='inherit' color='info' />;
    }

    if (isStateErrored(who)) {
      return <ErrorIcon className={className} fontSize='inherit' color='error' />;
    }

    if (!who.icon) {
      return <AppsIcon className={className} fontSize='inherit' color='success' />;
    }

    return <ZImageSource className={className} src={who.icon} width={ZSizeFixed.Medium} height={ZSizeFixed.Medium} />;
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
    <div className={_className}>
      <ZButton
        {...ButtonProps}
        className={_buttonClassName}
        avatar={renderAvatar()}
        label={renderLabel()}
        loading={isStateLoading(who)}
        onClick={navigate.bind(null, route)}
      />
    </div>
  );
}
