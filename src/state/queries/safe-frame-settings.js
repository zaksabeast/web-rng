import gql from 'graphql-tag';

export const GET_SAFE_FRAME_SETTINGS = gql`
  query {
    initSeed @client
    startFrame @client
    endFrame @client
    npcCount @client
  }
`;

export const SET_SAFE_FRAME_SETTINGS = gql`
  mutation(
    $initSeed: String!
    $startFrame: Int!
    $endFrame: Int!
    $npcCount: Int!
  ) {
    setSafeFrameSettings(
      initSeed: $initSeed
      startFrame: $startFrame
      endFrame: $endFrame
      npcCount: $npcCount
    ) @client
  }
`;
