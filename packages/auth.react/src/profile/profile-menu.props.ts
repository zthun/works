import { IZProfile } from '@zthun/auth.core';
import { ReactNode } from 'react';

export interface IZProfileMenuProps {
  children: ReactNode;
  hideLogout: boolean;

  profile?: IZProfile;

  onLogin: () => void;
  onLogout: () => void;
}
