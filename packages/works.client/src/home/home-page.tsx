import { Button, Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react';

export function ZHomePage() {
  return (
    <div className='ZHomePage-root m-xl' data-testid='ZHomePage-root'>
      <Card className='w-font-40'>
        <CardHeader title={<h3 className='p-no m-no'>React Components</h3>} subheader='UI Building Blocks' />
        <CardContent>
          <Typography variant='body2' color='primary'>
            The Zthunworks client is built in React and offers a library of components for those who want to use some of the functionality found here.
          </Typography>
          <Button variant='contained' color='primary'>
            Learn More...
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
