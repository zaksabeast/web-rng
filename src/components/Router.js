import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import HomeView from '../views/home';
import TimelineView from '../views/timeline';
import SafeFrameView from '../views/safe-frame';
import {
  GET_CURRENT_VIEW,
  SET_CURRENT_VIEW,
} from '../state/queries/current-view';

const getViewComponent = viewName => {
  switch (viewName) {
    case 'timeline':
      return <TimelineView />;
    case 'safe-frame':
      return <SafeFrameView />;
    default:
      return <HomeView />;
  }
};

export const Link = ({ children, route }) => {
  const [setCurrentView] = useMutation(SET_CURRENT_VIEW);
  return (
    <div onClick={() => setCurrentView({ variables: { view: route } })}>
      {children}
    </div>
  );
};

export const Router = () => {
  const { data } = useQuery(GET_CURRENT_VIEW);
  return getViewComponent(data.currentView);
};
