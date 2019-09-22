import gql from 'graphql-tag';

export const GET_EGGS = gql`
  query($settings: Gen7EggSettings, $frameAmount: Int!) {
    eggs: getGen7Eggs(settings: $settings, frameAmount: $frameAmount) @client
  }
`;
