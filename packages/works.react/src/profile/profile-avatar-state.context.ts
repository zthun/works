import { createContext, useContext } from 'react';
import { ZDataState } from '../store/data-state.class';
import { IZDataState } from '../store/data-state.interface';
import { useWatchableState } from '../store/use-watchable-state.hook';

export const ZProfileAvatarStateContext = createContext<IZDataState<Blob>>(new ZDataState<Blob>(null));

export function useProfileAvatar(): IZDataState<Blob> {
  return useContext(ZProfileAvatarStateContext);
}

export function useProfileAvatarState(): IZDataState<Blob> {
  const avatar = useProfileAvatar();
  return useWatchableState(avatar.data, avatar.dataChange, avatar);
}
