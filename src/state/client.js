import _ from 'lodash';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import resolvers from './resolvers';
import typeDefs from './type-definitions';

const initSeed = 0xaabbccdd;
const startFrame = 800;
const npcCount = 4;
const timelineSeconds = 0;
const tsvs = [123, 4048];
const endFrame = 0;
const eggSettings = {
  __typename: 'Gen7EggSettings',
  eggSeeds: [0xaabbccdd, 0xaabbccdd, 0xaabbccdd, 0xaabbccdd],
  femaleIVs: [31, 31, 31, 31, 31, 31],
  maleIVs: [31, 31, 31, 31, 31, 31],
  otherTSV: [4567],
  masudaMethod: false,
  isFemaleDitto: false,
  nidoType: false,
  sameDexNumber: false,
  shinyCharm: false,
  playerTSV: 1234,
  femaleAbility: '1',
  femaleItem: 'None',
  genderRatio: 'Genderlesss',
  maleAbility: '1',
  maleItem: 'None',
  frameAmount: 0,
};
const eggFilters = {
  __typename: 'EggFilters',
  gender: 'No Gender',
  upperIVs: [31, 31, 31, 31, 31, 31],
  lowerIVs: [0, 0, 0, 0, 0, 0],
  perfectIVs: 0,
  shinies: false,
  applyFilters: false,
};

export const defaultEggSettingsForm = {
  eggSettings: {
    ...eggSettings,
    eggSeeds: _.map(eggSettings.eggSeeds, seed => seed.toString(16))
      .join(', ')
      .toUpperCase(),
    femaleIVs: _.map(eggSettings.femaleIVs, iv => iv.toString(10)).join('/'),
    maleIVs: _.map(eggSettings.maleIVs, iv => iv.toString(10)).join('/'),
    otherTSV: eggSettings.otherTSV.join(', '),
  },
  eggFilters: {
    ...eggFilters,
    upperIVs: _.map(eggSettings.upperIVs, iv => iv.toString(10)).join('/'),
    lowerIVs: _.map(eggSettings.lowerIVs, iv => iv.toString(10)).join('/'),
  },
};

export const defaultSafeFrameSettings = {
  npcCount,
  endFrame,
  startFrame,
  initSeed: initSeed.toString(16).toUpperCase(),
};

export const defaultEggTimelineSettings = {
  startFrame,
  npcCount,
  timelineSeconds,
  tsvs: tsvs.join(', '),
  initSeed: initSeed.toString(16).toUpperCase(),
};

const initialState = {
  initSeed,
  startFrame,
  npcCount,
  timelineSeconds,
  tsvs,
  endFrame,
  eggSettings,
  eggFilters,
  isDrawerOpen: false,
  currentView: 'timeline',
};

const cache = new InMemoryCache();

const client = new ApolloClient({
  typeDefs,
  resolvers,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
  ]),
  cache,
});

cache.writeData({ data: initialState });

export default client;
