import { IZProfile } from '@zthun/works.core';
import { ReactNode } from 'react';

export interface IZProfileMenuProps {
  children: ReactNode;
  hideLogout: boolean;

  profile?: IZProfile;

  disabled: boolean;
  loading: boolean;

  onLogin: () => void;
  onLogout: () => void;
}
