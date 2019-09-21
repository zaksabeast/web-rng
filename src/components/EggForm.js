import _ from 'lodash';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '../components/TextField';
import makeStyles from '@material-ui/styles/makeStyles';
import AbilityDropdown from '../components/AbilityDropdown';
import ItemDropdown from '../components/ItemDropdown';
import GenderRatioDropdown from '../components/GenderRatioDropdown';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GenderDropdown from '../components/GenderDropdown';

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
  return {
    eggSeeds: _.map(
      _.split(_.get(refs.seeds.current, 'value', '1, 1, 1, 1'), ', ').reverse(),
      eggSeed => parseInt(eggSeed, 16),
    ),
    femaleIVs: _.map(
      _.split(_.get(refs.femaleIVs.current, 'value', '31/31/31/31/31/31'), '/'),
      iv => parseInt(iv, 10),
    ),
    maleIVs: _.map(
      _.split(_.get(refs.maleIVs.current, 'value', '31/31/31/31/31/31'), '/'),
      iv => parseInt(iv, 10),
    ),
    femaleAbility: _.get(refs.femaleAbility.current, 'value', '1'),
    maleAbility: _.get(refs.maleAbility.current, 'value', '1'),
    femaleItem: _.get(refs.femaleItem.current, 'value', 'None'),
    maleItem: _.get(refs.maleItem.current, 'value', 'None'),
    frameAmount: parseInt(_.get(refs.frameAmount.current, 'value', 10), 10),
    genderRatio: _.get(refs.genderRatio.current, 'value', 'Genderless'),
    playerTSV: parseInt(_.get(refs.playerTSV.current, 'value', 0), 10),
    otherTSV: _.map(
      _.split(_.get(refs.otherTSV.current, 'value', ''), '/'),
      tsv => parseInt(tsv, 10),
    ),
    masudaMethod: refs.masudaMethod.current.checked,
    shinyCharm: refs.shinyCharm.current.checked,
    isFemaleDitto: refs.isFemaleDitto.current.checked,
    nidoType: refs.nidoType.current.checked,
    sameDexNumber: refs.sameDexNumber.current.checked,
  };
};

const formatRefsAsFilters = refs => {
  return {
    gender: _.get(refs.gender.current, 'value', 'Genderless'),
    upperIVs: _.map(
      _.split(_.get(refs.upperIVs.current, 'value', '31/31/31/31/31/31'), '/'),
      iv => parseInt(iv, 10),
    ),
    lowerIVs: _.map(
      _.split(_.get(refs.lowerIVs.current, 'value', '0/0/0/0/0/0'), '/'),
      iv => parseInt(iv, 10),
    ),
    perfectIVs: parseInt(_.get(refs.perfectIVs.current, 'value', '0'), 10),
    shinies: _.get(refs.shinies.current, 'checked', false),
    applyFilters: _.get(refs.applyFilters.current, 'checked', false),
  };
};

const EggForm = ({ onSubmit = _.noop }) => {
  const classes = useStyles({});
  const refs = {
    seeds: React.useRef(null),
    femaleAbility: React.useRef(null),
    maleAbility: React.useRef(null),
    femaleItem: React.useRef(null),
    maleItem: React.useRef(null),
    femaleIVs: React.useRef(null),
    maleIVs: React.useRef(null),
    frameAmount: React.useRef(null),
    genderRatio: React.useRef(null),
    playerTSV: React.useRef(null),
    otherTSV: React.useRef(null),
    masudaMethod: React.useRef(null),
    shinyCharm: React.useRef(null),
    isFemaleDitto: React.useRef(null),
    nidoType: React.useRef(null),
    sameDexNumber: React.useRef(null),
    filters: {
      gender: React.useRef(null),
      upperIVs: React.useRef(null),
      lowerIVs: React.useRef(null),
      perfectIVs: React.useRef(null),
      shinies: React.useRef(null),
      applyFilters: React.useRef(null),
    },
  };

  // These inputs will be mapped over later with a key added
  /* eslint-disable react/jsx-key */
  const inputs = [
    <TextField
      inputRef={refs.seeds}
      label="Egg Seeds"
      placeholder="AABBCCDD, AABBCCDD, AABBCCDD, AABBCCDD"
    />,
    <AbilityDropdown
      inputRef={refs.femaleAbility}
      className={classes.fullWidth}
      label="Female Ability"
    />,
    <AbilityDropdown
      inputRef={refs.maleAbility}
      className={classes.fullWidth}
      label="Male Ability"
    />,
    <ItemDropdown
      inputRef={refs.femaleItem}
      className={classes.fullWidth}
      label="Female Item"
    />,
    <ItemDropdown
      inputRef={refs.maleItem}
      className={classes.fullWidth}
      label="Male Item"
    />,
    <TextField
      inputRef={refs.femaleIVs}
      label="Female IVs"
      fullWidth
      placeholder="31/31/31/31/31/31"
    />,
    <TextField
      inputRef={refs.maleIVs}
      label="Male IVs"
      fullWidth
      placeholder="31/31/31/31/31/31"
    />,
    <TextField
      inputRef={refs.frameAmount}
      label="Frame Amount"
      fullWidth
      placeholder="0"
    />,
    <GenderRatioDropdown
      inputRef={refs.genderRatio}
      className={classes.fullWidth}
      label="Gender Ratio"
    />,
    <TextField
      inputRef={refs.playerTSV}
      label="Your TSV"
      fullWidth
      placeholder="1234"
    />,
    <TextField
      inputRef={refs.otherTSV}
      label="Other TSVs"
      fullWidth
      placeholder="123, 4321, 5678"
    />,
    <FormControlLabel
      control={<Checkbox inputRef={refs.masudaMethod} />}
      label="Masuda Method"
    />,
    <FormControlLabel
      control={<Checkbox inputRef={refs.shinyCharm} />}
      label="Shiny Charm"
    />,
    <FormControlLabel
      control={<Checkbox inputRef={refs.nidoType} />}
      label="Parents are Nidoran"
    />,
    <FormControlLabel
      control={<Checkbox inputRef={refs.sameDexNumber} />}
      label="Parents are the same species"
    />,
    <FormControlLabel
      control={<Checkbox inputRef={refs.isFemaleDitto} />}
      label="The female is Ditto"
    />,
    <GenderDropdown
      inputRef={refs.filters.gender}
      className={classes.fullWidth}
      label="Gender Filter"
    />,
    <TextField
      inputRef={refs.filters.upperIVs}
      label="Upper IV Filter"
      fullWidth
      placeholder="31/31/31/31/31/31"
    />,
    <TextField
      inputRef={refs.filters.lowerIVs}
      label="Lower IV Filter"
      fullWidth
      placeholder="0/0/0/0/0/0"
    />,
    <TextField
      inputRef={refs.filters.perfectIVs}
      label="Perfect IVs"
      fullWidth
      placeholder="0"
    />,
    <FormControlLabel
      control={<Checkbox inputRef={refs.filters.shinies} />}
      label="Filter Shinies"
    />,
    <FormControlLabel
      control={<Checkbox inputRef={refs.filters.applyFilters} />}
      label="Apply Filters"
    />,
    <Button
      variant="contained"
      color="primary"
      className={classes.fullWidth}
      onClick={() =>
        onSubmit({
          settings: formatRefsAsSettings(refs),
          filters: formatRefsAsFilters(refs.filters),
        })
      }
    >
      Generate
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

export default EggForm;
