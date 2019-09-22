import gql from 'graphql-tag';

export const GET_SAFE_FRAMES = gql`
  query($initSeed: Int!, $startFrame: Int!, $endFrame: Int!, $npcCount: Int!) {
    safeFrames: getSafeFrames(
      sfmtSeed: $initSeed
      maxFrame: $endFrame
      minFrame: $startFrame
      npcNumber: $npcCount
    ) @client
  }
`;
