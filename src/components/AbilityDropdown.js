import React from 'react';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';

const AbilityDropdown = ({ label, ...props }) => {
  return (
    <React.Fragment>
      <Typography variant="h6">{label}</Typography>
      <NativeSelect {...props}>
        <option value="1">First</option>
        <option value="2">Second</option>
        <option value="H">Hidden</option>
      </NativeSelect>
    </React.Fragment>
  );
};

export default AbilityDropdown;
