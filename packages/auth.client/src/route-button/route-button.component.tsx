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
    <Button className='ZRouteButton-root' fullWidth={true} variant={props.variant} color={props.color} onClick={route} disabled={props.disabled}>{props.children}</Button>
  );
}

ZRouteButton.defaultProps = {
  disabled: false,
  variant: 'text',
  color: 'secondary'
};
