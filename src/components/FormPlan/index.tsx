/* eslint-disable no-useless-escape */
import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../Input';
import Button from '../Button';

import { FormGroup, FormGroupBlock } from './styles';

interface AddPlanFormData {
  template_id_click: string;
  plan_name: string;
  plan_id_rd: string;
}

interface FormPlanProps {
  initialData?: any;
  method: 'edit' | 'add';
  url: string;
}

const FormPlan: React.FC<FormPlanProps> = ({ initialData, method, url }) => {
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: AddPlanFormData) => {
      formRef.current?.setErrors({});
      try {
        const shapes: any = {
          template_id_click: Yup.string().required(
            'Template Click obrigatório',
          ),
          plan_name: Yup.string().required('Nome obrigatório'),
          plan_id_rd: Yup.string().required('Id RDStation obrigatório'),
        };

        const schema = Yup.object().shape(shapes);

        await schema.validate(data, {
          abortEarly: false,
        });

        const { template_id_click, plan_name, plan_id_rd } = data;

        const formData: any = {
          template_id_click,
          plan_name,
          plan_id_rd,
        };

        const methods = {
          edit: async () => api.put(url, formData),
          add: async () => api.post(url, formData),
        };

        const response = await methods[method]();

        if (response.data) {
          addToast({
            type: 'success',
            title: 'Plano Cadastrado/Alterado!',
            description: 'Novo Plano cadastrado/alterado com sucesso!',
          });
        }

        history.push('/plans');
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no Cadastro/Atualização!',
          description: err.response?.data?.error,
        });
      }
    },
    [addToast, url, method, history],
  );

  return (
    <Form initialData={initialData} ref={formRef} onSubmit={handleSubmit}>
      <FormGroup>
        <FormGroupBlock>
          <h2>Dados do Plano:</h2>
          <Input name="template_id_click" placeholder="Template Id Click" />
          <Input name="plan_name" placeholder="Nome do Plano" />
          <Input name="plan_id_rd" placeholder="Plan ID RDStation" />
        </FormGroupBlock>
      </FormGroup>

      <div>
        <Button type="submit">Salvar Plano</Button>
      </div>
    </Form>
  );
};

export default FormPlan;
