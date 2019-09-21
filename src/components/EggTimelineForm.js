import _ from 'lodash';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '../components/TextField';
import makeStyles from '@material-ui/styles/makeStyles';
import { formatTextAsArray } from '../utils/format-text-as-array';
import { COMMA_WITH_SPACE_REGEX } from '../constants/regex';
import { formatTextAsInt } from '../utils/format-text-as-int';

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

const formatRefsAsSettings = refs => {
  const tsvs = _.get(refs.tsvs.current, 'value');
  return {
    initSeed: formatTextAsInt(refs.initSeed.current.value, 0, 16),
    startFrame: formatTextAsInt(refs.startFrame.current.value, 0, 10),
    npcCount: formatTextAsInt(refs.npcCount.current.value, 0, 10),
    timelineSeconds: formatTextAsInt(refs.timelineSeconds.current.value, 0, 10),
    tsvs: _.map(formatTextAsArray(tsvs, COMMA_WITH_SPACE_REGEX, [0]), tsv =>
      parseInt(tsv, 10),
    ),
  };
};

const EggTimelineForm = ({ onSubmit = _.noop }) => {
  const classes = useStyles({});
  const refs = {
    initSeed: React.useRef(null),
    startFrame: React.useRef(null),
    npcCount: React.useRef(null),
    timelineSeconds: React.useRef(null),
    tsvs: React.useRef(null),
  };

  // These inputs will be mapped over later with a key added
  /* eslint-disable react/jsx-key */
  const inputs = [
    <TextField
      inputRef={refs.initSeed}
      label="Initial Seed"
      placeholder="AABBCCDD"
    />,
    <TextField
      inputRef={refs.startFrame}
      label="Start Frame"
      placeholder="900"
    />,
    <TextField inputRef={refs.npcCount} label="NPC Count" placeholder="4" />,
    <TextField
      inputRef={refs.timelineSeconds}
      label="Timeline Seconds"
      placeholder="120"
    />,
    <TextField
      inputRef={refs.tsvs}
      label="TSV Filter List"
      placeholder="123, 4567"
    />,
    <Button
      variant="contained"
      color="primary"
      className={classes.fullWidth}
      onClick={() => onSubmit(formatRefsAsSettings(refs))}
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
