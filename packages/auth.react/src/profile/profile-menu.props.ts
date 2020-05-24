import { ReactNode } from 'react';
export interface IZProfileMenuProps {
  children: ReactNode;
  hideLogout: boolean;

  onLogin: () => void;
  onLogout: () => void;
}
