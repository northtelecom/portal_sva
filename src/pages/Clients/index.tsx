import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { FiArrowRight, FiTrash } from 'react-icons/fi';
import MenuHeader from '../../components/MenuHeader';
import {
  Container,
  Content,
  HeaderPage,
  ClientInfo,
  ContentPage,
  SubscriptionContainer,
  Subscription,
} from './styles';
import api from '../../services/api';
import { Client } from '../../types/Client';
import InputSample from '../../components/InputSample';
import { useToast } from '../../hooks/toast';
import { productKeys } from '../../constants/productKeys';

const Clients: React.FC = () => {
  const { addToast } = useToast();
  const [isFetching, setIsFetching] = useState(false);
  const [documentFilter, setDocumentFilter] = useState('');
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (documentFilter === '') {
      return;
    }

    if (documentFilter.length === 11 || documentFilter.length === 14) {
      setIsFetching(true);
      api
        .get(`/clients/${documentFilter}`)
        .then(res => {
          setClient(res.data);
        })
        .finally(() => {
          setIsFetching(false);
        });
    } else {
      setClient(null);
    }
  }, [documentFilter]);

  const productsAvailables = useMemo(() => {
    if (client) {
      return Object.entries(productKeys)
        .filter(([productKey]) => {
          const hasSubscription = client.subscriptions?.find(
            subscription => productKey === subscription.productKey,
          );

          if (hasSubscription && hasSubscription.active) {
            return false;
          }

          return true;
        })
        .map(product => ({
          productKey: product[0],
          productName: product[1],
        }));
    }

    return Object.entries(productKeys).map(product => ({
      productKey: product[0],
      productName: product[1],
    }));
  }, [client]);

  const productsAssociates = useMemo(() => {
    if (client) {
      const clientSubscriptionsActive =
        client.subscriptions?.filter(subscription => subscription.active) || [];
      const clientSubscriptions = clientSubscriptionsActive?.map(
        subscription => {
          return {
            ...subscription,
            productName: productKeys[subscription.productKey],
          };
        },
      );

      return clientSubscriptions;
    }

    return [];
  }, [client]);

  const reload = useCallback(() => {
    if (documentFilter === '') {
      return;
    }

    if (documentFilter.length === 11 || documentFilter.length === 14) {
      setIsFetching(true);
      api
        .get(`/clients/${documentFilter}`)
        .then(res => {
          setClient(res.data);
        })
        .finally(() => {
          setIsFetching(false);
        });
    } else {
      setClient(null);
    }
  }, [documentFilter]);

  const createSubscription = useCallback(
    async productKey => {
      try {
        await api.post(`/playhub/subscription`, {
          clientId: client?.id,
          productKey,
        });
        reload();
      } catch (err: any) {
        addToast({
          type: 'error',
          title: 'Erro na assinatura',
          description: err.response?.data?.message,
        });
      }
    },
    [addToast, client, reload],
  );

  const removeSubscription = useCallback(
    async subscriptionId => {
      try {
        await api.delete(`/playhub/subscription/${subscriptionId}`);
        reload();
      } catch (err: any) {
        addToast({
          type: 'error',
          title: 'Erro ao remover assinatura',
          description: err.response?.data?.message,
        });
      }
    },
    [addToast, reload],
  );

  return (
    <Container>
      <MenuHeader />

      <Content>
        <ContentPage>
          <div
            style={{
              display: 'flex',
              gap: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                CPF/CNPJ:
              </span>
              <InputSample
                name="lead_name"
                containerStyle={{ width: 300, height: 20 }}
                onChange={e => setDocumentFilter(e.target.value)}
              />
            </div>
          </div>

          {client && (
            <>
              <ClientInfo>
                <h3>Nome: {client.name}</h3>
                <h3>Documento: {client.document}</h3>
              </ClientInfo>

              <HeaderPage>
                <div>
                  <h1>Assinaturas</h1>
                  <hr />
                </div>
              </HeaderPage>

              <SubscriptionContainer>
                <Subscription>
                  <table>
                    <thead>
                      <tr className="table100-head">
                        <th>Disponíveis</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsAvailables?.map(productsAvailable => {
                        return (
                          <tr key={productsAvailable.productKey}>
                            <td className="column2">
                              {productsAvailable.productName}
                            </td>
                            <td className="column1">
                              <FiArrowRight
                                onClick={() => {
                                  createSubscription(
                                    productsAvailable.productKey,
                                  );
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Subscription>
                <Subscription>
                  <table>
                    <thead>
                      <tr className="table100-head">
                        <th>Associados</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsAssociates?.map(subscription => {
                        return (
                          <tr key={subscription.id}>
                            <td className="column2">
                              {subscription.productKey}
                            </td>
                            <td className="column1">
                              <FiTrash
                                onClick={() => {
                                  removeSubscription(subscription.id);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Subscription>
              </SubscriptionContainer>
            </>
          )}

          {isFetching && <p className="fetching">Carregando...</p>}
        </ContentPage>
      </Content>
    </Container>
  );
};

export default Clients;
