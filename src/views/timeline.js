import _ from 'lodash';
import React from 'react';
import MainLayout from '../layouts/main';
import { useQuery } from '@apollo/react-hooks';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import EggTimelineForm from '../components/EggTimelineForm';
import EggTimelineResults from '../components/EggTimelineResults';
import { calculatePSV } from '../utils/calculate-psv';
import { GET_EGG_TIMELINE_SETTINGS } from '../state/queries/egg-timeline-settings';
import { GET_TIMELINE } from '../state/queries/get-timeline';

const useStyles = makeStyles({
  loadingText: {
    margin: 40,
  },
});

const TimelineView = () => {
  const classes = useStyles({});
  const { data: eggTimelineSettingsResults } = useQuery(
    GET_EGG_TIMELINE_SETTINGS,
  );
  const { tsvs, ...timelineSettings } = eggTimelineSettingsResults;
  const { loading, data: timelineResults } = useQuery(GET_TIMELINE, {
    variables: { ...timelineSettings, delayFrames: 38 },
  });
  const fetchedTimeline = _.get(timelineResults, 'timeline');
  const timeline = _.isEmpty(tsvs)
    ? fetchedTimeline
    : _.filter(fetchedTimeline, frame => {
        const psv = calculatePSV(frame.rand);
        return _.includes(tsvs, psv);
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
      // TypeScript doesn't seem to like Element[] without a Fragment
      // @ts-ignore
      form={<EggTimelineForm />}
      results={results}
    />
  );
};

export default TimelineView;
