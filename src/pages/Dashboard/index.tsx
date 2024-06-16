import React from 'react';
import { Link } from 'react-router-dom';

import MenuHeader from '../../components/MenuHeader';
import { Container, Content, Menu, MenuItem } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <MenuHeader />

      <Content>
        <Menu>
          <Link to="/clients">
            <MenuItem>Clientes</MenuItem>
          </Link>
        </Menu>
      </Content>
    </Container>
  );
};

export default Dashboard;
