import { formatTextAsArray } from './format-text-as-array';
import { SLASH_WITH_SPACE_REGEX } from '../constants/regex';

/**
 *
 * @param {string} text
 * @returns {Array<number>}
 */
export const formatIVs = text => {
  return formatTextAsArray(
    text,
    SLASH_WITH_SPACE_REGEX,
    [31, 31, 31, 31, 31, 31],
    num => parseInt(num, 10),
  );
};
