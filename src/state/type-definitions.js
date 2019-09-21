import gql from 'graphql-tag';

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

  input Gen7EggSettings {
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
  }

  type Query {
    currentView: String!
    hello: String!
    seed: Int!
    getGen7Eggs(settings: Gen7EggSettings!, frameAmount: Int!): [EggFrame!]!
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
  }
`;

export default typeDefs;
