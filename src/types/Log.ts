import { productKeys } from '../constants/productKeys';

type ProductKey = keyof typeof productKeys;

export interface Log {
  id: string;
  userId: string;
  clientId: string;
  detail: {
    action: 'subscription' | 'unsubscription';
    success: boolean;
    productKey: ProductKey;
    verifyPermissionInHub: boolean;
    reason?: string | object;
  };
  createdAt: Date;
  updatedAt: Date;
}
