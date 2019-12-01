import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { IZRouteButtonProperties } from './route-button-properties.interface';

export function ZRouteButton(props: IZRouteButtonProperties) {
  const history = useHistory();

  function route() {
    history.push(props.route);
  }

  return (
    <div className='ZRouteButton-root'>
      <Button className='ZRouteButton-btn' fullWidth={true} variant='text' color={props.color} onClick={route} disabled={props.disabled}>{props.children}</Button>
    </div>
  );
}

ZRouteButton.defaultProps = {
  disabled: false,
  color: 'secondary'
};
