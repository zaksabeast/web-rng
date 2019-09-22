import { wrap } from 'comlink';

/** @type {import('gen7rng').generateEggs} */
// Overriding TypeScript's type
// @ts-ignore
const generateEggs = wrap(new Worker('../workers/generate-eggs.js'));

/** @type {import('gen7rng').getSafeFrames} */
// Overriding TypeScript's type
// @ts-ignore
const getSafeFrames = wrap(new Worker('../workers/get-safe-frames.js'));

/** @type {import('gen7rng').createTimeline} */
// Overriding TypeScript's type
// @ts-ignore
const createTimeline = wrap(new Worker('../workers/create-timeline.js'));

const resolvers = {
  Query: {
    hello: () => 'world!',
    getGen7Eggs: (parent, args) => {
      if (args.frameAmount <= 0) {
        return [];
      }

      return generateEggs(args.settings, args.frameAmount);
    },
    getSafeFrames: (parent, args) => {
      if (args.minFrame >= args.maxFrame) {
        return [];
      }

      return getSafeFrames(
        args.sfmtSeed,
        args.minFrame,
        args.maxFrame,
        args.npcNumber,
      );
    },
    createTimeline: (parent, args) => {
      if (args.seconds <= 0 || args.startFrame <= 0) {
        return [];
      }

      return createTimeline(
        args.sfmtSeed,
        args.startFrame,
        args.npcNumber,
        args.seconds,
        args.delayFrames,
      );
    },
  },
  Mutation: {
    setSeed: (parent, args, context) => {
      const updatedState = { seed: args.seed };
      context.cache.writeData({ data: updatedState });

      return true;
    },
    setDrawerOpen: (parent, args, context) => {
      const updatedState = { isDrawerOpen: args.isDrawerOpen };
      context.cache.writeData({ data: updatedState });

      return true;
    },
    setCurrentView: (parent, args, context) => {
      const updatedState = { currentView: args.view };
      context.cache.writeData({ data: updatedState });

      return true;
    },
    setSafeFrameSettings: (parent, args, context) => {
      context.cache.writeData({ data: args });

      return true;
    },
    setEggTimelineSettings: (parent, args, context) => {
      context.cache.writeData({ data: args });

      return true;
    },
    setEggSettings: (parent, args, context) => {
      context.cache.writeData({ data: args });

      return true;
    },
  },
};

export default resolvers;
