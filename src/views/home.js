import _ from 'lodash';
import React from 'react';
import MainLayout from '../layouts/main';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import EggResults from '../components/EggResults';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import EggForm from '../components/EggForm';

const GET_EGGS = gql`
  query($settings: Gen7EggSettings, $frameAmount: Int!) {
    eggs: getGen7Eggs(settings: $settings, frameAmount: $frameAmount) @client
  }
`;

const useStyles = makeStyles({
  loadingText: {
    margin: 40,
  },
});

const defaultSettings = {
  settings: {
    eggSeeds: [1, 2, 3, 4],
    femaleIVs: [31, 31, 31, 31, 31, 31],
    maleIVs: [1, 2, 3, 4, 5, 6],
    otherTSV: [],
    masudaMethod: true,
    isFemaleDitto: true,
    nidoType: false,
    sameDexNumber: false,
    shinyCharm: true,
    playerTSV: 1234,
    femaleAbility: 'H',
    femaleItem: 'Destiny Knot',
    genderRatio: '1:1',
    maleAbility: 'H',
    maleItem: 'Everstone',
    frameAmount: 0,
  },
  filters: {
    gender: 'No Gender',
    upperIVs: [31, 31, 31, 31, 31, 31],
    lowerIVs: [0, 0, 0, 0, 0, 0],
    perfectIVs: 0,
    shinies: false,
    applyFilters: false,
  },
};

const checkIfIVsAreInRange = (upperIVs, lowerIVs, ivs) => {
  return _.every(
    ivs,
    (iv, index) => lowerIVs[index] <= iv && upperIVs[index] >= iv,
  );
};

const checkPerfectIVs = (perfectIVCount, ivs) => {
  const perfectIVs = _.filter(ivs, iv => iv === 31);

  return perfectIVs.length >= perfectIVCount;
};

const filterResults = (filters, eggs) => {
  return _.filter(
    eggs,
    ({ egg }) =>
      (filters.gender === 'No Gender' || egg.gender === filters.gender) &&
      checkIfIVsAreInRange(filters.upperIVs, filters.lowerIVs, egg.ivs) &&
      checkPerfectIVs(filters.perfectIVs, egg.ivs) &&
      (!filters.shinies || egg.shiny),
  );
};

const HomeView = () => {
  const classes = useStyles({});
  const [{ filters, settings }, setSettings] = React.useState(defaultSettings);
  const { frameAmount } = settings;
  const { loading, data } = useQuery(GET_EGGS, {
    variables: {
      settings,
      frameAmount,
    },
  });
  const eggs = filters.applyFilters
    ? filterResults(filters, data.eggs)
    : _.get(data, 'eggs', []);
  const results = loading ? (
    <Typography variant="h5" className={classes.loadingText}>
      Loading...
    </Typography>
  ) : (
    <EggResults eggResults={eggs} />
  );

  return (
    <MainLayout
      title="Gen 7 Egg"
      form={<EggForm onSubmit={setSettings} />}
      results={results}
    />
  );
};

export default HomeView;
