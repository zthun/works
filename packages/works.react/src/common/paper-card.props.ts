export interface IZPaperCardProps {
  className: string;
  children: React.ReactNode;

  headerText: string;
  subHeaderText: string;

  loading: boolean;

  avatar: React.ReactNode;
  action: React.ReactNode;
}
