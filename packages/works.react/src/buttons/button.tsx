import { Button } from '@mui/material';
import React, { ReactNode } from 'react';
import { makeStyles } from '../theme/make-styles';

import { cssClass } from '@zthun/works.core';
import { noop } from 'lodash';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentStyle } from '../component/component-style.interface';
import { ZCircularProgress } from '../loading/circular-progress';
import { StateColor } from '../theme/state-color';

export interface IZButton extends IZComponentHierarchy, IZComponentDisabled, IZComponentLoading, IZComponentStyle {
  avatar?: ReactNode;
  color?: StateColor;
  outline?: boolean;

  onClick?: (e: React.MouseEvent) => any;
}

const useButtonStyles = makeStyles()((theme) => {
  return {
    button: {
      display: 'flex',
      alignItems: 'center'
    },

    avatar: {
      display: 'flex',
      marginRight: theme.sizing.gaps.sm
    },

    loading: {
      marginLeft: theme.sizing.gaps.sm
    }
  };
});

/**
 * Represents a basic button component.
 *
 * @param props The properties for this button.
 *
 * @returns The JSX to render this button.
 */
export function ZButton(props: IZButton) {
  const { className, children, color = 'inherit', disabled, loading = false, outline, avatar, onClick = noop } = props;
  const styles = useButtonStyles();
  const buttonClass = cssClass('ZButton-root', className, styles.classes.button);
  const avatarClass = cssClass('ZButton-avatar', styles.classes.avatar);
  const loadingClass = cssClass('ZButton-loading', styles.classes.loading);
  const variant = outline ? 'outlined' : 'contained';

  const renderAvatar = () => {
    if (!avatar) {
      return null;
    }

    return <div className={avatarClass}>{avatar}</div>;
  };

  return (
    <Button className={buttonClass} color={color} variant={variant} disabled={disabled} onClick={onClick}>
      {renderAvatar()}
      {children}
      <ZCircularProgress className={loadingClass} size='sm' show={loading} />
    </Button>
  );
}
