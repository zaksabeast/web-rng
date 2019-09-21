import _ from 'lodash';
import React, { createContext, forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
  stickyRow: {
    position: 'sticky',
    zIndex: 2,
  },
});

const StickyListContext = createContext(null);
StickyListContext.displayName = 'StickyListContext';

const ItemWrapper = ({ data, index, style }) => {
  const { ItemRenderer, stickyIndices } = data;
  if (stickyIndices && stickyIndices.includes(index)) {
    return null;
  }
  return <ItemRenderer index={index} style={style} />;
};

const withStickyRow = (extraStyles, Row) => ({ style, ...props }) => {
  const classes = useStyles({});
  return (
    <div className={classes.stickyRow} style={{ ...style, ...extraStyles }}>
      <Row {...props} />
    </div>
  );
};

export const createInnerStickyList = (extraStyles, Row) => {
  const StickyRow = withStickyRow(extraStyles, Row);
  const InnerStickyList = forwardRef(({ children, ...rest }, ref) => (
    <StickyListContext.Consumer>
      {({ stickyIndices }) => (
        <div ref={ref} {...rest}>
          {_.map(stickyIndices, index => (
            <StickyRow
              index={index}
              key={index}
              style={{ top: index * 35, left: 0, width: '100%', height: 35 }}
            />
          ))}

          {children}
        </div>
      )}
    </StickyListContext.Consumer>
  ));

  InnerStickyList.displayName = 'InnerStickyList';

  return InnerStickyList;
};

const StickyList = ({ children, stickyRow, stickyIndices, style, ...rest }) => {
  const innerElement = createInnerStickyList(style, stickyRow);
  return (
    <StickyListContext.Provider
      value={{ ItemRenderer: children, stickyIndices }}
    >
      <List
        itemData={{ ItemRenderer: children, stickyIndices }}
        innerElementType={innerElement}
        {...rest}
      >
        {ItemWrapper}
      </List>
    </StickyListContext.Provider>
  );
};

export default StickyList;
