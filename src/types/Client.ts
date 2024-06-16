import { Subscription } from './Subscription';

export interface Client {
  id: string;
  name: string;
  document: string;
  subscriptions?: Subscription[];
  created_at: Date;
  updated_at: Date;
}
