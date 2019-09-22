import gql from 'graphql-tag';

export const GET_EGG_TIMELINE_SETTINGS = gql`
  query {
    initSeed @client
    startFrame @client
    npcCount @client
    tsvs @client
    timelineSeconds @client
  }
`;

export const SET_EGG_TIMELINE_SETTINGS = gql`
  mutation(
    $initSeed: Int!
    $startFrame: Int!
    $npcCount: Int!
    $tsvs: [Int!]!
    $timelineSeconds: Int!
  ) {
    setSafeFrameSettings(
      initSeed: $initSeed
      startFrame: $startFrame
      npcCount: $npcCount
      tsvs: $tsvs
      timelineSeconds: $timelineSeconds
    ) @client
  }
`;
