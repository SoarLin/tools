export interface Tool {
  id: string;
  title: string;
  tags: string[];
  component: React.ReactNode;
  icon?: React.ReactNode;
}

export type PurchaseStatus = 'purchased' | 'ordered' | 'planned';

export interface FurnitureItem {
  id: string;
  name: string;
  brand?: string;
  productName: string;
  price: number;
  specs: string;
  url?: string;
  status: PurchaseStatus;
  deposit?: number;
  note?: string;
  tags: string[];
}

export interface Milestone {
  name: string;
  date: string;
  money: number;
  isPaid: boolean;
}
