import _ from 'lodash';

/**
 *
 * @param {string} text
 * @param {RegExp|string} delimiter
 * @param {Array<any>} defaultArray
 */
export const formatTextAsArray = (text, delimiter, defaultArray) => {
  return _.isEmpty(text) ? defaultArray : _.split(text, delimiter);
};
