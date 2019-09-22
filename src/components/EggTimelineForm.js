import _ from 'lodash';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '../components/TextField';
import makeStyles from '@material-ui/styles/makeStyles';
import { formatTextAsArray } from '../utils/format-text-as-array';
import { COMMA_WITH_SPACE_REGEX } from '../constants/regex';
import { formatTextAsInt } from '../utils/format-text-as-int';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useForm } from '../utils/use-form';
import { defaultEggTimelineSettings } from '../state/client';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
  },
  input: {
    paddingTop: 20,
    paddingBottom: 20,
    maxWidth: 300,
  },
});

const GET_EGG_TIMELINE_SETTINGS = gql`
  query {
    initSeed @client
    startFrame @client
    npcCount @client
    tsvs @client
    timelineSeconds @client
  }
`;

const SET_EGG_TIMELINE_SETTINGS = gql`
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

const parseSettings = settings => {
  return {
    initSeed: formatTextAsInt(
      settings.initSeed,
      parseInt(defaultEggTimelineSettings.initSeed, 16),
      16,
    ),
    startFrame: formatTextAsInt(
      settings.startFrame,
      defaultEggTimelineSettings.startFrame,
      10,
    ),
    npcCount: formatTextAsInt(
      settings.npcCount,
      defaultEggTimelineSettings.npcCount,
      10,
    ),
    tsvs: formatTextAsArray(settings.tsvs, COMMA_WITH_SPACE_REGEX, [], num =>
      parseInt(num, 10),
    ),
    timelineSeconds: formatTextAsInt(
      settings.timelineSeconds,
      defaultEggTimelineSettings.timelineSeconds,
      10,
    ),
  };
};

const EggTimelineForm = () => {
  const classes = useStyles({});
  const { getRefs, getValues } = useForm(
    defaultEggTimelineSettings,
    parseSettings,
  );
  const refs = getRefs();
  const { loading, data } = useQuery(GET_EGG_TIMELINE_SETTINGS);
  const [setEggTimelineSettings] = useMutation(SET_EGG_TIMELINE_SETTINGS);

  if (loading) {
    return null;
  }

  // These inputs will be mapped over later with a key added
  /* eslint-disable react/jsx-key */
  const inputs = [
    <TextField
      label="Initial Seed"
      placeholder={data.initSeed.toString(16).toUpperCase()}
      inputRef={refs.initSeed}
    />,
    <TextField
      label="Start Frame"
      type="number"
      placeholder={data.startFrame.toString(10)}
      inputRef={refs.startFrame}
    />,
    <TextField
      label="NPC Count"
      type="number"
      placeholder={data.npcCount.toString(10)}
      inputRef={refs.npcCount}
    />,
    <TextField
      label="Timeline Seconds"
      type="number"
      placeholder={data.timelineSeconds.toString(10)}
      inputRef={refs.timelineSeconds}
    />,
    <TextField
      label="TSV Filter List"
      placeholder={data.tsvs.join(', ')}
      inputRef={refs.tsvs}
    />,
    <Button
      variant="contained"
      color="primary"
      className={classes.fullWidth}
      onClick={() => setEggTimelineSettings({ variables: getValues() })}
    >
      Get Egg Timeline
    </Button>,
  ];
  /* eslint-enable react/jsx-key */

  return _.map(inputs, (input, index) => (
    // These won't be reordered, so we can use the index for the key
    <div key={index} className={classes.input}>
      {input}
    </div>
  ));
};

export default EggTimelineForm;
