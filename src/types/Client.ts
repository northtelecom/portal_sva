import { Subscription } from './Subscription';

export interface Client {
  id: string;
  name: string;
  document: string;
  subscriptions?: Subscription[];
  createdAt: Date;
  updatedAt: Date;
}
