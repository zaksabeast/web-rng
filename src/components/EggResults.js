import _ from 'lodash';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/styles/makeStyles';
import AutoSizer from 'react-virtualized-auto-sizer';
import StickyList from './StickyList';

const columns = [
  'Frame',
  'Frame advance',
  'Egg seeds',
  'Original seed',
  'IVs',
  'Shiny',
  'Ability',
  'Ball',
  'EC',
  'Gender',
  'Nature',
  'PID',
  'PSV',
];

const ROW_WIDTH = 2500;

/** @type {{ backgroundColor: string, whiteSpace: "nowrap" }} */
const baseTableCellStyles = {
  backgroundColor: '#fff',
  whiteSpace: 'nowrap',
};

const useStyles = makeStyles({
  smallTableCell: {
    ...baseTableCellStyles,
    width: 70,
  },
  tableCell: {
    ...baseTableCellStyles,
    width: 150,
  },
  wideTableCell: {
    ...baseTableCellStyles,
    width: 350,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
});

const formatEggRow = eggResult => {
  const { egg, frame, eggSeeds, frameAdvance, originalEggSeeds } = eggResult;

  return [
    frame,
    frameAdvance,
    eggSeeds
      .map(seed => seed.toString(16).toUpperCase())
      .reverse()
      .join(', '),
    originalEggSeeds
      .map(seed => seed.toString(16).toUpperCase())
      .reverse()
      .join(', '),
    egg.ivs.join('/'),
    egg.shiny ? 'Shiny' : 'N/A',
    egg.ability,
    egg.ball,
    egg.ec,
    egg.gender,
    egg.nature,
    egg.pid,
    egg.psv,
  ];
};

const getTableCellClassname = cellIndex => {
  switch (cellIndex) {
    case 0:
    case 5:
    case 6:
    case 7:
    case 9:
    case 10:
    case 12:
      return 'smallTableCell';
    case 2:
    case 3:
      return 'wideTableCell';
    default:
      return 'tableCell';
  }
};

const createRow = (formatResults, eggResults) => ({ index, style }) => {
  const classes = useStyles({});
  const cells = formatResults(eggResults[index]);

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
          className={classes[getTableCellClassname(columnIndex)]}
        >
          {cell}
        </TableCell>
      ))}
    </TableRow>
  );
};

const EggResults = ({ eggResults }) => {
  const eggResultsWithPlaceholder = [{}, ...eggResults];
  const rowRenderer = createRow(formatEggRow, eggResultsWithPlaceholder);
  const headerRowRenderer = createRow(_.identity, [columns]);
  return (
    <AutoSizer>
      {({ height, width }) => (
        <StickyList
          height={height}
          width={width}
          itemCount={eggResultsWithPlaceholder.length}
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

export default EggResults;
