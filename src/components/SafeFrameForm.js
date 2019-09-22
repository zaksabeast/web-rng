import _ from 'lodash';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '../components/TextField';
import makeStyles from '@material-ui/styles/makeStyles';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { formatTextAsInt } from '../utils/format-text-as-int';
import { defaultSafeFrameSettings } from '../state/client';
import { useForm } from '../utils/use-form';
import {
  GET_SAFE_FRAME_SETTINGS,
  SET_SAFE_FRAME_SETTINGS,
} from '../state/queries/safe-frame-settings';

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

const parseSettings = settings => {
  return {
    initSeed: formatTextAsInt(
      settings.initSeed,
      parseInt(defaultSafeFrameSettings.initSeed, 16),
      16,
    ),
    startFrame: formatTextAsInt(
      settings.startFrame,
      defaultSafeFrameSettings.startFrame,
      10,
    ),
    endFrame: formatTextAsInt(
      settings.endFrame,
      defaultSafeFrameSettings.endFrame,
      10,
    ),
    npcCount: formatTextAsInt(
      settings.npcCount,
      defaultSafeFrameSettings.npcCount,
      10,
    ),
  };
};

const SafeFrameForm = () => {
  const classes = useStyles({});
  const { getRefs, getValues } = useForm(
    defaultSafeFrameSettings,
    parseSettings,
  );
  const refs = getRefs();
  const { loading, data } = useQuery(GET_SAFE_FRAME_SETTINGS);
  const [setSafeFrameSettings] = useMutation(SET_SAFE_FRAME_SETTINGS);

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
      label="End Frame"
      type="number"
      placeholder={data.endFrame.toString(10)}
      inputRef={refs.endFrame}
    />,
    <TextField
      label="NPC Count"
      type="number"
      placeholder={data.npcCount.toString(10)}
      inputRef={refs.npcCount}
    />,
    <Button
      variant="contained"
      color="primary"
      className={classes.fullWidth}
      onClick={() => setSafeFrameSettings({ variables: getValues() })}
    >
      Find Safe Frames
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

export default SafeFrameForm;
