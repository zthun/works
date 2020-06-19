import { Button, Card, CardActions, CardContent, CardHeader, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';

export function ZHomePage() {
  return (
    <Grid container={true} spacing={3} className='ZHomePage-root mx-auto w-75'>
      <Grid item={true} xs={4}>
        <Paper className='ZHomePage-root m-xl w-font-20 mx-auto' data-testid='ZHomePage-root' elevation={3}>
          <Card className='p-md'>
            <CardHeader title={<h3 className='p-no m-no'>React Components</h3>} subheader='UI Building Blocks' />
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
      </Grid>
      <Grid item={true} xs={4}>
        <Paper className='ZHomePage-root m-xl w-font-20 mx-auto' data-testid='ZHomePage-root' elevation={3}>
          <Card className='p-md'>
            <CardHeader title={<h3 className='p-no m-no'>React Components</h3>} subheader='UI Building Blocks' />
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
      </Grid>
      <Grid item={true} xs={4}>
        <Paper className='ZHomePage-root m-xl w-font-20 mx-auto' data-testid='ZHomePage-root' elevation={3}>
          <Card className='p-md'>
            <CardHeader title={<h3 className='p-no m-no'>React Components</h3>} subheader='UI Building Blocks' />
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
      </Grid>
    </Grid>
  );
}
