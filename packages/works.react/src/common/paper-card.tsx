import { Card, CardContent, CardHeader, Paper } from '@material-ui/core';
import React from 'react';
import { ZCircularProgress } from './circular-progress';
import { IZPaperCardProps } from './paper-card.props';

/**
 * Renders a material ui card wrapped in paper at a standard elevation.
 *
 * @param props The properties for the paper card.
 *
 * @returns The jsx for the paper card.
 */
export function ZPaperCard(props: IZPaperCardProps): JSX.Element {
  /**
   * Creates the action button.
   *
   * @returns The jsx for the action button.
   */
  function createAction() {
    return (
      <div className='ZPaperCard-header-action'>
        {props.action}
        <ZCircularProgress className='ZPaperCard-progress-loading' data-testid='ZPaperCard-progress-loading' show={props.loading} />
      </div>
    );
  }

  return (
    <Paper className={`${props.className} ZPaperCard-root`} data-testid={props['data-testid']} elevation={5}>
      <Card>
        <CardHeader className='ZPaperCard-header' avatar={props.avatar} action={createAction()} title={<h3>{props.headerText}</h3>} subheader={props.subHeaderText} />
        <CardContent>{props.children}</CardContent>
      </Card>
    </Paper>
  );
}

ZPaperCard.defaultProps = {
  subHeaderText: '',

  className: '',
  children: null,

  loading: false,

  avatar: null,
  action: null
};
