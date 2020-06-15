import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: 'rgb(60, 80, 100)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue['A200'],
  },
  listItemTextSecondary: {
    color: 'rgb(100,100,500)'
  },
  listItemTextPrimary: {
    color: 'white'
  },
  title: {
    color: 'white',
    fontSize: 'larger'
  }
  
}));

export default function CharacterCard({ id, name, image, gender, status, species, origin }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {name[0]}
          </Avatar>
        }
        classes={{
          title: classes.title,
        }}
        title={name}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          id: {id}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem>
              <ListItemText classes={{ primary: classes.listItemTextPrimary, secondary: classes.listItemTextSecondary }} primary='STATUS' secondary={status} />
            </ListItem>
            <Divider />
            <ListItem button divider>
              <ListItemText classes={{ primary: classes.listItemTextPrimary, secondary: classes.listItemTextSecondary }} primary='SPECIES' secondary={species} />
            </ListItem>
            <ListItem button>
              <ListItemText classes={{ primary: classes.listItemTextPrimary, secondary: classes.listItemTextSecondary }} primary='GENDER' secondary={gender} />
            </ListItem>
            <Divider light />
            <ListItem button>
              <ListItemText classes={{ primary: classes.listItemTextPrimary, secondary: classes.listItemTextSecondary }} primary='ORIGIN' secondary={origin.name} />
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}
