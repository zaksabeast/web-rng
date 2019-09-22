import gql from 'graphql-tag';

export const GET_DRAWER_STATE = gql`
  query {
    isDrawerOpen @client
  }
`;

export const SET_DRAWER_OPEN = gql`
  mutation($isDrawerOpen: Boolean!) {
    setDrawerOpen(isDrawerOpen: $isDrawerOpen) @client
  }
`;
