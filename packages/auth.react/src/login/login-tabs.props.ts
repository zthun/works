import { IZLogin } from '@zthun/auth.core';

export interface IZLoginTabsProps {
  login(credentials: IZLogin): Promise<void>;
  create(credentials: IZLogin): Promise<void>;
  recover(credentials: IZLogin): Promise<void>;
}
