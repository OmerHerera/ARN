import CharacterCard from './CharacterCard'
import React from 'react';
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function debounce(fn, time) {
  let id;
  return (...args) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      fn.apply(this, args);
      id = null;
    }, time);
  };
}

function onChanged(value) {
  console.log(`My Value: ${value}`);
}

// const GET_ALL_CHARACTERS = gql`
//   {
//     characters(filter: { name: "$name" }) {
//       info {
//         next
//         prev
//         pages
//         count
//       }
//       results {
//         id
//         name
//         type
//         species
//         gender
//         image
//         status
//         origin {
//           name
//           dimension
//         }
//     }
//     }
//   }
// `
const GET_ALL_CHARACTERS = gql`
  query characters($input: FilterCharacter) {
  characters(filter: $input) {
    info {
      next
      prev
      pages
      count
    }
    results {
      id
      name
      type
      species
      gender
      image
      status
      origin {
        name
        dimension
      }
      species
    }
  }
}
`


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '75%',
    margin: '10%'
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rmGrid: {
    margin: 0
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();
  // const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, { variables: {filter: { name: "Annie" }} })
  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, { variables: { "input": { "name": "" } } });

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>
  
  const debounceOnChanged = debounce(onChanged, 1000);
 
  return (  
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={
          e => debounceOnChanged(e.target.value)
        } />
      </form>
      <Grid container spacing={5} className={classes.rmGrid}>
        {
          data.characters.results.map(character => (
            <Grid item xs={3} key={character.id}>
              <CharacterCard {...character}/>
            </Grid>
            ))
        }
      </Grid>
    </div>
  );
}

