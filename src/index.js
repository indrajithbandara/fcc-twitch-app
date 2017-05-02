import {setup} from '@cycle/run';
import onionify from 'cycle-onionify';
import {makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import {rerunner, restartable} from 'cycle-restart';
import app from './app';

const drivers = () => ({
  HTTP: restartable(makeHTTPDriver()),
  DOM: restartable(makeDOMDriver('#app'), {pauseSinksWhileReplaying: false}),
});

let rerun = rerunner(setup, drivers);
rerun(onionify(app));

if (module.hot) {
  module.hot.accept('./app', () => {
    const newApp = require('./app').default;

    rerun(onionify(newApp));
  });
}
