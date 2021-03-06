import { CommonConfigProvider } from 'Common/container/CommonConfigContainer';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import Navigation from 'Common/Components/Navigation';
import React, { useEffect } from 'react';
import ReihungenContainer from 'Common/container/ReihungContainer';
import useStyles from './App.style';

const LazyRouting = loadable(() => import('./Routing'));
const LazyDetails = loadable(() =>
  import('Common/Components/Details/DetailsRoute')
);
const LazyAbfahrten = loadable(() => import('./Abfahrten'));
const About = loadable(() => import('Common/Components/About'));

const App = () => {
  useStyles();
  useEffect(() => {
    const jssStyles = document.querySelector('#jss');

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <CommonConfigProvider>
      <Navigation>
        <ReihungenContainer.Provider>
          <Switch>
            <Route path="/about" component={About} exact />
            <Route
              component={LazyDetails}
              path="/details/:train/:initialDeparture*"
            />
            <Route component={LazyRouting} path="/routing" />
            <Route component={LazyAbfahrten} path="/" />
          </Switch>
        </ReihungenContainer.Provider>
      </Navigation>
    </CommonConfigProvider>
  );
};

export default App;
