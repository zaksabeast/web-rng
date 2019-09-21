import _ from 'lodash';
import React from 'react';
import MainLayout from '../layouts/main';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import EggTimelineForm from '../components/EggTimelineForm';
import EggTimelineResults from '../components/EggTimelineResults';
import { calculatePSV } from '../utils/calculate-psv';

const GET_TIMELINE = gql`
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

const useStyles = makeStyles({
  loadingText: {
    margin: 40,
  },
});

const defaultSettings = {
  initSeed: 0xaabbccdd,
  startFrame: 900,
  npcCount: 4,
  timelineSeconds: 0,
  tsvs: [],
};

const TimelineView = () => {
  const classes = useStyles({});
  const [settings, setSettings] = React.useState(defaultSettings);
  const { loading, data } = useQuery(GET_TIMELINE, {
    variables: { ...settings, delayFrames: 38 },
  });
  const fetchedTimeline = _.get(data, 'timeline');
  const timeline = _.isEmpty(settings.tsvs)
    ? fetchedTimeline
    : _.filter(fetchedTimeline, frame => {
        const psv = calculatePSV(frame.rand);
        return _.includes(settings.tsvs, psv);
      });
  const results = loading ? (
    <Typography variant="h5" className={classes.loadingText}>
      Loading...
    </Typography>
  ) : (
    <EggTimelineResults timelineResults={timeline} />
  );

  return (
    <MainLayout
      title="Egg Timeline"
      // @ts-ignore
      form={<EggTimelineForm onSubmit={setSettings} />}
      results={results}
    />
  );
};

export default TimelineView;
