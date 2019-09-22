import React from 'react';
import MainLayout from '../layouts/main';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import SafeFrameForm from '../components/SafeFrameForm';
import SafeFrameResults from '../components/SafeFrameResults';

const GET_SAFE_FRAME_SETTINGS = gql`
  query {
    initSeed @client
    startFrame @client
    endFrame @client
    npcCount @client
  }
`;

const GET_SAFE_FRAMES = gql`
  query($initSeed: Int!, $startFrame: Int!, $endFrame: Int!, $npcCount: Int!) {
    safeFrames: getSafeFrames(
      sfmtSeed: $initSeed
      maxFrame: $endFrame
      minFrame: $startFrame
      npcNumber: $npcCount
    ) @client
  }
`;

const useStyles = makeStyles({
  loadingText: {
    margin: 40,
  },
});

const SafeFrameView = () => {
  const classes = useStyles({});
  const { data: safeFrameSettingsResults } = useQuery(GET_SAFE_FRAME_SETTINGS);
  const { loading, data: safeFrameResults } = useQuery(GET_SAFE_FRAMES, {
    variables: {
      initSeed: safeFrameSettingsResults.initSeed,
      startFrame: safeFrameSettingsResults.startFrame,
      endFrame: safeFrameSettingsResults.endFrame,
      npcCount: safeFrameSettingsResults.npcCount,
    },
  });
  const results = loading ? (
    <Typography variant="h5" className={classes.loadingText}>
      Loading...
    </Typography>
  ) : (
    <SafeFrameResults safeFrameResults={safeFrameResults.safeFrames} />
  );

  return (
    <MainLayout
      title="Timeline Safe Frame"
      // TypeScript doesn't seem to like Element[] without a Fragment
      // @ts-ignore
      form={<SafeFrameForm />}
      results={results}
    />
  );
};

export default SafeFrameView;
