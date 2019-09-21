import _ from 'lodash';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/styles/makeStyles';
import AutoSizer from 'react-virtualized-auto-sizer';
import StickyList from './StickyList';

const columns = ['Safe Frame'];

const ROW_WIDTH = 300;

const useStyles = makeStyles({
  tableCell: {
    backgroundColor: '#fff',
    whiteSpace: 'nowrap',
    width: 300,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
});

const createRow = (formatResults, results) => ({ index, style }) => {
  const classes = useStyles({});
  const cells = formatResults(results[index]);

  return (
    <TableRow
      // style is provided and required by react-window, including a width,
      // so we can't use a className for width here
      style={{ ...style, width: ROW_WIDTH }}
      component="div"
    >
      {_.map(cells, (cell, columnIndex) => (
        <TableCell
          key={columnIndex} // these won't ever be sorted differently
          component="div"
          align="right"
          className={classes.tableCell}
        >
          {cell}
        </TableCell>
      ))}
    </TableRow>
  );
};

const SafeFrameResults = ({ safeFrameResults }) => {
  const safeFrameResultsWithPlaceholder = [{}, ...safeFrameResults];
  const rowRenderer = createRow(num => [num], safeFrameResultsWithPlaceholder);
  const headerRowRenderer = createRow(_.identity, [columns]);
  return (
    <AutoSizer>
      {({ height, width }) => (
        <StickyList
          height={height}
          width={width}
          itemCount={safeFrameResultsWithPlaceholder.length}
          itemSize={50}
          stickyIndices={[0]}
          stickyRow={headerRowRenderer}
          style={{ width: ROW_WIDTH }}
        >
          {rowRenderer}
        </StickyList>
      )}
    </AutoSizer>
  );
};

export default SafeFrameResults;
