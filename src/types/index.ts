export interface Tool {
  id: string;
  title: string;
  tags: string[];
  component: React.ReactNode;
  icon?: React.ReactNode;
}
