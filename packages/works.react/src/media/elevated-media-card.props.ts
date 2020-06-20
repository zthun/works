import { ReactNode } from 'react';

export interface IZElevatedMediaCardProps {
  title: string;
  imageUrl?: string;
  children?: ReactNode;

  width: 'full' | number;
  units: 'rem' | 'em' | 'px';

  learnMoreText: string;
  onLearnMore: () => void;
}
