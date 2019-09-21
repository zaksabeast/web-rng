import React from 'react';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';

const GenderDropdown = ({ label, ...props }) => {
  return (
    <React.Fragment>
      <Typography variant="h6">{label}</Typography>
      <NativeSelect {...props}>
        <option value="No Gender">No Gender</option>
        <option value="Genderless">Genderless</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </NativeSelect>
    </React.Fragment>
  );
};

export default GenderDropdown;
