import React from 'react';
import MainLayout from '../layouts/main';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import SafeFrameForm from '../components/SafeFrameForm';
import SafeFrameResults from '../components/SafeFrameResults';

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

const defaultSettings = {
  initSeed: 0xaabbccdd,
  startFrame: 0,
  endFrame: 0,
  npcCount: 4,
};

const SafeFrameView = () => {
  const classes = useStyles({});
  const [settings, setSettings] = React.useState(defaultSettings);
  const { loading, data } = useQuery(GET_SAFE_FRAMES, {
    variables: settings,
  });
  const results = loading ? (
    <Typography variant="h5" className={classes.loadingText}>
      Loading...
    </Typography>
  ) : (
    <SafeFrameResults safeFrameResults={data.safeFrames} />
  );

  return (
    <MainLayout
      title="Timeline Safe Frame"
      // @ts-ignore
      form={<SafeFrameForm onSubmit={setSettings} />}
      results={results}
    />
  );
};

export default SafeFrameView;
