import _ from 'lodash';

/**
 *
 * @param {string} text
 * @param {number} defaultInt
 * @param {number} [radix=10]
 */
export const formatTextAsInt = (text, defaultInt, radix = 10) => {
  return _.isEmpty(text) ? defaultInt : parseInt(text, radix);
};
