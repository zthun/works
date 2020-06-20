import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Paper, Typography } from '@material-ui/core';
import React from 'react';

/**
 * A basic material ui card that is elevated on paper in a consistent format.
 */
export function ZElevatedMediaCard() {
  return (
    <Paper className='ZElevatedMediaCard-root' data-testid='ZElevatedMediaCard-root' elevation={3}>
      <Card>
        <CardHeader title={<h3>React Components</h3>} subheader='UI Building Blocks' />
        <CardMedia component='img' image='/images/svg/react.svg' title='React' />
        <CardContent>
          <Typography variant='body2' color='primary'>
            The Zthunworks client is built in React and offers a library of components for those who want to use some of the functionality found here.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant='contained' color='primary'>
            Learn More...
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
}
