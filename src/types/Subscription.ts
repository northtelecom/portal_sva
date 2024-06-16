export interface Subscription {
  id: string;
  productKey: string;
  active: boolean;
  document: string;
  created_at: Date;
  updated_at: Date;
}
