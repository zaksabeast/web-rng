import _ from 'lodash';

/**
 *
 * @param {string} text
 * @param {RegExp|string} delimiter
 * @param {Array<any>} defaultArray
 * @param {_.ArrayIterator<string, any>} parser
 */
export const formatTextAsArray = (
  text,
  delimiter,
  defaultArray,
  parser = _.identity,
) => {
  return _.isEmpty(text)
    ? defaultArray
    : _.map(_.split(text, delimiter), parser);
};
