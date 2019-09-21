import _ from 'lodash';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import TodayIcon from '@material-ui/icons/Today';
import { Link } from './Router';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({ isOpen, onClose = _.noop }) {
  const classes = useStyles({});

  return (
    <Drawer anchor="top" open={isOpen} onClose={onClose}>
      <div className={classes.fullList} role="presentation">
        <List>
          <Link route="home">
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Egg RNG" />
            </ListItem>
          </Link>
          <Link route="safe-frame">
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <FingerprintIcon />
              </ListItemIcon>
              <ListItemText primary="Safe Frame" />
            </ListItem>
          </Link>
          <Link route="timeline">
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary="Egg Timeline" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
}
