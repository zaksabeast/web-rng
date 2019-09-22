import gql from 'graphql-tag';

const EGG_FILTER_PROPS = `
  gender: String!
  upperIVs: [Int!]!
  lowerIVs: [Int!]!
  perfectIVs: Int!
  shinies: Boolean!
  applyFilters: Boolean!
`;

const EGG_SETTINGS_PROPS = `
  eggSeeds: [Int!]!
  femaleIVs: [Int!]!
  maleIVs: [Int!]!
  otherTSV: [Int!]!
  masudaMethod: Boolean!
  isFemaleDitto: Boolean!
  nidoType: Boolean!
  sameDexNumber: Boolean!
  shinyCharm: Boolean!
  playerTSV: Int!
  femaleAbility: String!
  femaleItem: String!
  genderRatio: String!
  maleAbility: String!
  maleItem: String!
`;

const typeDefs = gql`
  type TimelineFrame {
    frame: Int!
    rand: Int!
    delayFrame: Int!
  }

  type Egg {
    ivs: [Int!]!
    shiny: Boolean!
    ability: String!
    ball: String!
    ec: String!
    gender: String!
    nature: String!
    pid: String!
    psv: String!
  }

  type EggFrame {
    frame: Int!
    egg: Egg!
    frameAdvance: Int!
    eggSeeds: [Int!]!
    originalEggSeeds: [Int!]!
  }

  input EggFiltersInput {
    ${EGG_FILTER_PROPS}
  }

  type EggFilters {
    ${EGG_FILTER_PROPS}
  }

  input Gen7EggSettingsInput {
    ${EGG_SETTINGS_PROPS}
  }

  type Gen7EggSettings {
    ${EGG_SETTINGS_PROPS}
  }

  type Query {
    currentView: String!
    hello: String!
    seed: Int!
    initSeed: Int!
    startFrame: Int!
    endFrame: Int!
    npcCount: Int!
    tsvs: [Int!]!
    timelineSeconds: Int!
    eggSettings: Gen7EggSettings!
    eggFilters: EggFilters!
    getGen7Eggs(settings: Gen7EggSettingsInput!, frameAmount: Int!): [EggFrame!]!
    getSafeFrames(
      sfmtSeed: Int!
      minFrame: Int!
      maxFrame: Int!
      npcNumber: Int!
    ): [Int!]!
    createTimeline(
      sfmtSeed: Int!
      startFrame: Int!
      npcNumber: Int!
      seconds: Int!
      delayFrames: Int!
    ): [TimelineFrame!]!
  }

  type Mutation {
    setCurrentView(view: String!): Boolean!
    setSeed(seed: Int!): Boolean!
    setDrawerOpen(isDrawerOpen: Boolean!): Boolean!
    setSafeFrameSettings(
      initSeed: Int!
      startFrame: Int!
      endFrame: Int!
      npcCount: Int!
    ): Boolean!
    setEggTimelineSettings(
      initSeed: Int!
      startFrame: Int!
      npcCount: Int!
      tsvs: [Int!]!
      timelineSeconds: Int!
    ): Boolean!
    setEggSettings(
      eggSettings: Gen7EggSettingsInput!
      eggFilters: EggFiltersInput!
    ): Boolean!
  }
`;

export default typeDefs;
