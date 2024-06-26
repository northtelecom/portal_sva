import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1400px;
  margin: 64px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .fetching {
    text-align: center;
    color: #ff9000;
  }

  table {
    border-spacing: 1;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  table * {
    position: relative;
  }
  table td,
  table th {
    padding-left: 8px;
    text-align: center;
  }
  table thead tr {
    height: 60px;
    background: #28262e;
  }
  table tbody tr {
    height: 50px;
  }
  table tbody tr:last-child {
    border: 0;
  }

  tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  tbody tr:nth-child(odd) {
    background-color: white;
  }

  tbody tr {
    font-family: OpenSans-Regular;
    font-size: 15px;
    color: #808080;
    line-height: 1.2;
    font-weight: unset;
  }

  tbody tr:hover {
    color: #555555;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  .column1 {
    width: 160px;
  }

  .column2 {
    width: 160px;
  }

  .column3 {
    width: 245px;
  }
  td.column3 {
    text-align: left;
  }

  .column4 {
    width: 110px;
  }

  .column5 {
    width: 170px;
  }

  .column6 {
    width: 222px;
  }

  .column6 {
    width: 222px;
  }

  table td svg {
    color: #ff9000;
    height: 40px;
    width: 20px;
  }

  table td svg + svg {
    margin-left: 10px;
  }

  @media screen and (max-width: 992px) {
    table {
      display: block;
    }
    table > *,
    table tr,
    table td,
    table th {
      display: block;
    }
    table thead {
      display: none;
    }
    table tbody tr {
      height: auto;
      padding: 37px 0;
    }
    table tbody tr td {
      padding-left: 40% !important;
      margin-bottom: 24px;
    }
    table tbody tr td:last-child {
      margin-bottom: 0;
    }
    table tbody tr td:before {
      font-family: OpenSans-Regular;
      font-size: 14px;
      color: #999999;
      line-height: 1.2;
      font-weight: unset;
      position: absolute;
      width: 40%;
      left: 30px;
      top: 0;
    }
    table tbody tr td:nth-child(1):before {
      content: 'Nome';
    }
    table tbody tr td:nth-child(2):before {
      content: 'Código';
    }
    table tbody tr td:nth-child(3):before {
      content: 'Descrição';
    }
    table tbody tr td:nth-child(4):before {
      content: 'Marca';
    }
    table tbody tr td:nth-child(5):before {
      content: 'Modelo';
    }
    table tbody tr td:nth-child(6):before {
      content: 'Categoria';
    }
    table tbody tr td:nth-child(7):before {
      content: 'Fabricante';
    }
    table tbody tr td:nth-child(8):before {
      content: 'Unidade de Medida';
    }

    table td,
    table th {
      text-align: left;
    }

    .column4,
    .column5,
    .column6,
    .column1,
    .column2,
    .column3 {
      width: 100%;
    }

    tbody tr {
      font-size: 14px;
    }
  }
`;

export const AvatarInput = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    width: 32px;
    height: 32px;
    border: 1px solid #ff9000;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }

    input {
      display: none;
    }
  }
`;

export const HeaderPage = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  div {
    width: 100%;

    hr {
      width: 100%;
      color: white;
      height: 2px;
    }

    h1 {
      color: #ff9000;
    }
  }

  button {
    width: 260px;
  }

  svg {
    display: none;
    width: 40px;
    height: 40px;
    font-weight: bold;
    color: #ff9000;
  }

  @media screen and (max-width: 992px) {
    button {
      display: none;
    }

    svg {
      display: flex;
    }
  }
`;

export const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 24px 0;
`;

export const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`;

export const SubscriptionContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const Subscription = styled.div`
  flex: 1;
`;
