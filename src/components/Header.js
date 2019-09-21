import React from 'react';
import AppBar from '../components/AppBar';
import Drawer from '../components/Drawer';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_DRAWER_STATE = gql`
  query {
    isDrawerOpen @client
  }
`;

const SET_DRAWER_OPEN = gql`
  mutation($isDrawerOpen: Boolean!) {
    setDrawerOpen(isDrawerOpen: $isDrawerOpen) @client
  }
`;

const Header = () => {
  const { data } = useQuery(GET_DRAWER_STATE);
  const [setDrawerOpen] = useMutation(SET_DRAWER_OPEN);

  const handleClick = () => {
    setDrawerOpen({ variables: { isDrawerOpen: !data.isDrawerOpen } });
  };

  return (
    <React.Fragment>
      <AppBar onClick={handleClick} />
      <Drawer isOpen={data.isDrawerOpen || false} onClose={handleClick} />
    </React.Fragment>
  );
};

export default Header;
