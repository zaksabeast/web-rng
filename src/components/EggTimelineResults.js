import _ from 'lodash';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/styles/makeStyles';
import AutoSizer from 'react-virtualized-auto-sizer';
import StickyList from './StickyList';
import { calculatePSV } from '../utils/calculate-psv';

const columns = ['Frame', 'PSV'];

const ROW_WIDTH = 600;

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

const formatEggTimelineRow = timelineResult => {
  return [timelineResult.frame, calculatePSV(timelineResult.rand)];
};

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

const EggTimelineResults = ({ timelineResults }) => {
  const timelineResultsWithPlaceholder = [{}, ...timelineResults];
  const rowRenderer = createRow(
    formatEggTimelineRow,
    timelineResultsWithPlaceholder,
  );
  const headerRowRenderer = createRow(_.identity, [columns]);
  return (
    <AutoSizer>
      {({ height, width }) => (
        <StickyList
          height={height}
          width={width}
          itemCount={timelineResultsWithPlaceholder.length}
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

export default EggTimelineResults;
