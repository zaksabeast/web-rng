import _ from 'lodash';
import React from 'react';
import MainLayout from '../layouts/main';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import EggResults from '../components/EggResults';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import EggForm from '../components/EggForm';

const GET_EGG_SETTINGS = gql`
  query {
    eggSettings @client {
      __typename
      eggSeeds
      femaleIVs
      maleIVs
      otherTSV
      masudaMethod
      isFemaleDitto
      nidoType
      sameDexNumber
      shinyCharm
      playerTSV
      femaleAbility
      femaleItem
      genderRatio
      maleAbility
      maleItem
      frameAmount
    }
    eggFilters @client {
      __typename
      gender
      upperIVs
      lowerIVs
      perfectIVs
      shinies
      applyFilters
    }
  }
`;

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
  const { data: eggSettingResults } = useQuery(GET_EGG_SETTINGS);
  const { eggFilters, eggSettings } = eggSettingResults;
  const { frameAmount, ...settings } = eggSettings;
  const { loading, data: eggResults } = useQuery(GET_EGGS, {
    variables: {
      settings,
      frameAmount,
    },
  });
  const eggs = eggFilters.applyFilters
    ? filterResults(eggFilters, eggResults.eggs)
    : _.get(eggResults, 'eggs', []);
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
      // TypeScript doesn't seem to like Element[] without a Fragment
      // @ts-ignore
      form={<EggForm />}
      results={results}
    />
  );
};

export default HomeView;
