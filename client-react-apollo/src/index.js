import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import './index.css';
// import Board from './Board'
import Grid from './Grid'
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';
Sentry.init({dsn: "https://dcafd30c09d94c66b3bb861783e80ff6@o35798.ingest.sentry.io/5263557"});


const client = new ApolloClient({
  // uri: 'http://localhost:3300/'
  uri: 'https://rickandmortyapi.com/graphql/'
})
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <button onClick={() => { throw("this") }} >Break the world</button>
      <Typography variant="body2" color="textSecondary" component="p">
        RICK AND MORTY
      </Typography>
      <Grid />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
