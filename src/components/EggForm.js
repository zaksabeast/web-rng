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
import { formatTextAsArray } from '../utils/format-text-as-array';
import { COMMA_WITH_SPACE_REGEX } from '../constants/regex';
import { formatTextAsInt } from '../utils/format-text-as-int';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { defaultEggSettingsForm } from '../state/client';
import { useForm } from '../utils/use-form';
import { formatIVs } from '../utils/format-ivs';
import {
  GET_EGG_SETTINGS,
  SET_EGG_SETTINGS,
} from '../state/queries/egg-settings';

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
    eggSettings: {
      __typename: 'Gen7EggSettings',
      eggSeeds: formatTextAsArray(
        settings.eggSettings.eggSeeds,
        COMMA_WITH_SPACE_REGEX,
        [0xaabbccdd, 0xaabbccdd, 0xaabbccdd, 0xaabbccdd],
        num => parseInt(num, 16),
      ),
      femaleIVs: formatIVs(settings.eggSettings.femaleIVs),
      maleIVs: formatIVs(settings.eggSettings.maleIVs),
      otherTSV: formatTextAsArray(
        settings.eggSettings.otherTSV,
        COMMA_WITH_SPACE_REGEX,
        [],
        num => parseInt(num, 10),
      ),
      masudaMethod: settings.eggSettings.masudaMethod,
      isFemaleDitto: settings.eggSettings.isFemaleDitto,
      nidoType: settings.eggSettings.nidoType,
      sameDexNumber: settings.eggSettings.sameDexNumber,
      shinyCharm: settings.eggSettings.shinyCharm,
      playerTSV: formatTextAsInt(
        settings.eggSettings.playerTSV,
        defaultEggSettingsForm.eggSettings.playerTSV,
        10,
      ),
      femaleAbility: settings.eggSettings.femaleAbility,
      femaleItem: settings.eggSettings.femaleItem,
      genderRatio: settings.eggSettings.genderRatio,
      maleAbility: settings.eggSettings.maleAbility,
      maleItem: settings.eggSettings.maleItem,
      frameAmount: formatTextAsInt(
        settings.eggSettings.frameAmount,
        defaultEggSettingsForm.eggSettings.frameAmount,
        10,
      ),
    },
    eggFilters: {
      __typename: 'EggFilters',
      gender: settings.eggFilters.gender,
      upperIVs: formatIVs(settings.eggFilters.upperIVs),
      lowerIVs: formatIVs(settings.eggFilters.lowerIVs),
      perfectIVs: formatTextAsInt(
        settings.eggFilters.frameAmount,
        defaultEggSettingsForm.eggFilters.perfectIVs,
        10,
      ),
      shinies: settings.eggFilters.shinies,
      applyFilters: settings.eggFilters.applyFilters,
    },
  };
};

const EggForm = () => {
  const classes = useStyles({});
  const { getRefs, getValues } = useForm(defaultEggSettingsForm, parseSettings);
  const refs = getRefs();
  const { loading, data } = useQuery(GET_EGG_SETTINGS);
  const [setEggSettings] = useMutation(SET_EGG_SETTINGS);

  if (loading) {
    return null;
  }

  // These inputs will be mapped over later with a key added
  /* eslint-disable react/jsx-key */
  const inputs = [
    <TextField
      label="Egg Seeds"
      placeholder={data.eggSettings.eggSeeds
        .map(seed => seed.toString(16))
        .join(', ')
        .toUpperCase()}
      inputRef={refs.eggSettings.eggSeeds}
    />,
    <AbilityDropdown
      className={classes.fullWidth}
      label="Female Ability"
      inputRef={refs.eggSettings.femaleAbility}
    />,
    <AbilityDropdown
      className={classes.fullWidth}
      label="Male Ability"
      inputRef={refs.eggSettings.maleAbility}
    />,
    <ItemDropdown
      className={classes.fullWidth}
      label="Female Item"
      inputRef={refs.eggSettings.femaleItem}
    />,
    <ItemDropdown
      className={classes.fullWidth}
      label="Male Item"
      inputRef={refs.eggSettings.maleItem}
    />,
    <TextField
      label="Female IVs"
      fullWidth
      placeholder={data.eggSettings.femaleIVs.join('/')}
      inputRef={refs.eggSettings.femaleIVs}
    />,
    <TextField
      label="Male IVs"
      fullWidth
      placeholder={data.eggSettings.maleIVs.join('/')}
      inputRef={refs.eggSettings.maleIVs}
    />,
    <TextField
      label="Frame Amount"
      fullWidth
      placeholder={data.eggSettings.frameAmount.toString(10)}
      inputRef={refs.eggSettings.frameAmount}
    />,
    <GenderRatioDropdown
      className={classes.fullWidth}
      label="Gender Ratio"
      inputRef={refs.eggSettings.genderRatio}
    />,
    <TextField
      label="Your TSV"
      fullWidth
      placeholder={data.eggSettings.playerTSV.toString(10)}
      inputRef={refs.eggSettings.playerTSV}
    />,
    <TextField
      label="Other TSVs"
      fullWidth
      placeholder={data.eggSettings.otherTSV.join(', ')}
      inputRef={refs.eggSettings.otherTSV}
    />,
    <FormControlLabel
      control={<Checkbox />}
      label="Masuda Method"
      inputRef={refs.eggSettings.masudaMethod}
    />,
    <FormControlLabel
      control={<Checkbox />}
      label="Shiny Charm"
      inputRef={refs.eggSettings.shinyCharm}
    />,
    <FormControlLabel
      control={<Checkbox />}
      label="Parents are Nidoran"
      inputRef={refs.eggSettings.nidoType}
    />,
    <FormControlLabel
      control={<Checkbox />}
      label="Parents are the same species"
      inputRef={refs.eggSettings.sameDexNumber}
    />,
    <FormControlLabel
      control={<Checkbox />}
      label="The female is Ditto"
      inputRef={refs.eggSettings.isFemaleDitto}
    />,
    <GenderDropdown
      className={classes.fullWidth}
      label="Gender Filter"
      inputRef={refs.eggFilters.gender}
    />,
    <TextField
      label="Upper IV Filter"
      fullWidth
      placeholder={data.eggFilters.upperIVs.join('/')}
      inputRef={refs.eggFilters.upperIVs}
    />,
    <TextField
      label="Lower IV Filter"
      fullWidth
      placeholder={data.eggFilters.lowerIVs.join('/')}
      inputRef={refs.eggFilters.lowerIVs}
    />,
    <TextField
      label="Perfect IVs"
      fullWidth
      placeholder={data.eggFilters.perfectIVs.toString(10)}
      inputRef={refs.eggFilters.perfectIVs}
    />,
    <FormControlLabel
      control={<Checkbox />}
      label="Filter Shinies"
      inputRef={refs.eggFilters.shinies}
    />,
    <FormControlLabel
      control={<Checkbox />}
      label="Apply Filters"
      inputRef={refs.eggFilters.applyFilters}
    />,
    <Button
      variant="contained"
      color="primary"
      className={classes.fullWidth}
      onClick={() => setEggSettings({ variables: getValues() })}
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
