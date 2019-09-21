import React from 'react';
import Typography from '@material-ui/core/Typography';
import MUITextField from '@material-ui/core/TextField';

const TextField = ({ label, ...props }) => {
  return (
    <React.Fragment>
      <Typography variant="h6">{label}</Typography>
      <MUITextField fullWidth {...props} />
    </React.Fragment>
  );
};

export default TextField;
