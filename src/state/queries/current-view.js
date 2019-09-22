import gql from 'graphql-tag';

export const GET_CURRENT_VIEW = gql`
  query {
    currentView @client
  }
`;

export const SET_CURRENT_VIEW = gql`
  mutation($view: String!) {
    setCurrentView(view: $view) @client
  }
`;
