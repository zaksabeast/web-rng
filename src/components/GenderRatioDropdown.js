import React from 'react';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';

const GenderRatioDropdown = ({ label, ...props }) => {
  return (
    <React.Fragment>
      <Typography variant="h6">{label}</Typography>
      <NativeSelect {...props}>
        <option value="Genderless">Genderless</option>
        <option value="1:1">1:1</option>
        <option value="7:1">7:1</option>
        <option value="3:1">3:1</option>
        <option value="1:3">1:3</option>
        <option value="1:7">1:7</option>
        <option value="Male Only">Male Only</option>
        <option value="Female Only">Female Only</option>
      </NativeSelect>
    </React.Fragment>
  );
};

export default GenderRatioDropdown;
