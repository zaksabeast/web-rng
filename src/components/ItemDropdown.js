import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';

const ItemDropdown = ({ label, ...props }) => {
  return (
    <React.Fragment>
      <Typography variant="h6">{label}</Typography>
      <NativeSelect {...props}>
        <option value="None">None</option>
        <option value="Everstone">Everstone</option>
        <option value="Destiny Knot">Destiny Knot</option>
        <option value="Power Weight">Power Weight</option>
        <option value="Power Bracer">Power Bracer</option>
        <option value="Power Belt">Power Belt</option>
        <option value="Power Lens">Power Lens</option>
        <option value="Power Band">Power Band</option>
        <option value="Power Anklet">Power Anklet</option>
      </NativeSelect>
    </React.Fragment>
  );
};

export default ItemDropdown;
