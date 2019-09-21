import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 86,
  },
  inputContainer: {
    width: '80%',
    margin: '10px auto',
    padding: 20,
    maxWidth: 700,
    // @ts-ignore
    [theme.breakpoints.up('sm')]: {
      padding: 50,
    },
  },
  resultContainer: {
    width: '100%',
    height: '75vh',
  },
  titleText: {
    margin: '30px 10px',
  },
  resultText: {
    margin: '30px 10px',
  },
}));

/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {JSX.Element | JSX.Element[]} props.form
 * @param {JSX.Element} props.results
 */
const MainLayout = ({ title, form, results }) => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.titleText}>
        {title}
      </Typography>
      <Paper className={classes.inputContainer}>{form}</Paper>
      <Typography variant="h4" className={classes.resultText}>
        Results
      </Typography>
      <Paper className={classes.resultContainer}>{results}</Paper>
    </div>
  );
};

export default MainLayout;
