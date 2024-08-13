import { Subscription } from './Subscription';

export interface Client {
  id: string;
  name: string;
  document: string;
  subscriptions?: Subscription[];
  clientHubSoft: {
    email_principal: string;
    telefone_primario: string;
    telefone_secundario: string;
    servicos: {
      nome: string;
      status: string;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}
