import gql from 'graphql-tag';

export const GET_EGG_SETTINGS = gql`
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

export const SET_EGG_SETTINGS = gql`
  mutation($eggSettings: Gen7EggSettingsInput!, $eggFilters: EggFiltersInput!) {
    setEggSettings(eggSettings: $eggSettings, eggFilters: $eggFilters) @client
  }
`;
