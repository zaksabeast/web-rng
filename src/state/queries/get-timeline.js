import gql from 'graphql-tag';

export const GET_TIMELINE = gql`
  query(
    $initSeed: Int!
    $startFrame: Int!
    $npcCount: Int!
    $timelineSeconds: Int!
    $delayFrames: Int!
  ) {
    timeline: createTimeline(
      sfmtSeed: $initSeed
      startFrame: $startFrame
      npcNumber: $npcCount
      seconds: $timelineSeconds
      delayFrames: $delayFrames
    ) @client
  }
`;
