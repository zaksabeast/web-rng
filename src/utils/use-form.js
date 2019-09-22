import _ from 'lodash';
import React from 'react';

/**
 *
 * @template T
 * @param {T} defaults
 * @param {(values: T) => any} parser
 */
export const useForm = (defaults, parser = _.identity) => {
  const refs = _.cloneDeepWith(defaults, value => {
    if (!_.isPlainObject(value)) {
      return {
        ref: React.useRef({ value: '' }),
        default: value,
      };
    }
  });

  const getValues = () => {
    const values = _.cloneDeepWith(refs, value => {
      if (_.has(value, 'ref')) {
        if (value.ref.current.type === 'checkbbox') {
          return value.ref.current.checked;
        }

        const hasLength = value.ref.current.value.length > 0;
        return hasLength ? value.ref.current.value : value.default;
      }
    });

    return parser(values);
  };

  const getRefs = () => {
    return _.cloneDeepWith(refs, value => {
      if (_.has(value, 'ref')) {
        return value.ref;
      }
    });
  };

  return {
    getRefs,
    getValues,
  };
};
