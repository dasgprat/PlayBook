import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import post1 from './About-post.1.md';
import { Link } from 'react-router-dom';


const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

const featuredPosts = [
  {
    title: 'John\'s Testimony',
    date: 'Jan 24',
    description:
      'PlayBook is what I was looking for in my current BookManager. It provides a starting point for my learning and motivated me to pursue other people playlists. Also, it helps me keep track of multiple skills at the same time.'
  },
  {
    title: 'Jenna\'s Testimony',
    date: 'Jan 22',
    description:
      'PlayBook can provide a platform what is currently missing from learning. With so many resources available and with various skills in demand, it can really help master skills quickly and effectively',
  },
];

const posts = [];

const archives = [
  'Jan 2019'
];

const social = ['Pinterest', 'FlipBoard','Twitter', 'Facebook'];

function About(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Toolbar className={classes.toolbarMain}>          
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}            
          >
            Playbook - for Success
          </Typography>
          <Typography varaint ="h3">
            <Link to="/login">Sign in</Link>
          </Typography>               
        </Toolbar>       
        <main>
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            <Grid container>
              <Grid item md={12}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    Spotify For Learning
                  </Typography>
                  <Typography variant="subtitle1" color="inherit">
                   PlayBook is a WebApp where users can login and create a personalized playlist of the skill that they are learning/teaching. It will be a list of each new skills people are trying to learn by bookmarking online posts,videos,audios or books. Once playlist is created, it can be categorized and tagged with keywords so it can be searched easily. These personalized playlists can be used at any time for users’ reference so they can track and replay their journey of learning the skills. Also, if a user is sharing his/her playlists for different skills then other users can subscribe those playlists and rate it based on effectiveness and content. This will help users to fast track their learning curve and also master any new skill. If a user is unsure of how to create a playlist he/she can use discovery feature to experience best suited playlist for that skill.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
          {/* End main featured post */}
          {/* Sub featured posts */}
          <Grid container spacing={40} className={classes.cardGrid}>
            {featuredPosts.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {post.date}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {post.description}
                      </Typography>                      
                    </CardContent>
                  </div>                  
                    <CardMedia
                      className={classes.cardMedia}
                      image="/assets/no-avatar.png" // eslint-disable-line max-len
                      title="Image title"
                    />                  
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* End sub featured posts */}
          <Grid container spacing={40} className={classes.mainGrid}>
            {/* Main content */}
            <Grid item xs={12} md={8}>              
              <Divider />
              {posts.map(post => (
                <Markdown className={classes.markdown} key={post.substring(0, 40)}>
                  {post}
                </Markdown>
              ))}
            </Grid>
            {/* End main content */}
            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant="h6" gutterBottom>
                  Team
                </Typography>
                <Typography color = "inherit" line>
                  Prateek Dasgupta                  
                </Typography>
                <Typography color = "inherit" line>
                  Braden  Hitchock                                   
                </Typography>
                <Typography color = "inherit" line>
                Sudha Ravi Kumar Javvadi                                   
                </Typography>
              </Paper>
              <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Archives
              </Typography>
              {archives.map(archive => (
                <Typography key={archive}>{archive}</Typography>
              ))}
              <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Connect With Us
              </Typography>
              {social.map(network => (
                <Typography key={network}>{network}</Typography>
              ))}
            </Grid>
            {/* End sidebar */}
          </Grid>
        </main>
      </div>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          PlayBook
        </Typography>        
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
