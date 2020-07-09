import { ReactNode } from 'react';

export interface IZSummaryCardProps {
  title: string;
  imageUrl: string;
  children: ReactNode;

  learnMoreText: string;
  onLearnMore: () => void;
}
