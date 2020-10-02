import { Grid, IconButton } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import RestoreIcon from '@material-ui/icons/Restore';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { ZImageReader, ZPrintableColor, ZPrintableDrawing, ZPrintableGroup, ZPrintableImage, ZPrintableTransform } from '@zthun/works.draw';
import { noop } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { ZActionForm } from '../common/action-form';
import { IZProfileAvatarFormProps } from './profile-avatar-form.props';

export function ZProfileAvatarForm(props: IZProfileAvatarFormProps) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const transform = useRef<ZPrintableTransform>(new ZPrintableTransform());
  const draw = useRef<ZPrintableDrawing>(new ZPrintableDrawing());

  useEffect(() => {
    async function render() {
      const image = new ZPrintableImage(new ZImageReader());
      await image.import(props.avatar);
      draw.current.midground = new ZPrintableGroup([transform.current, image]);
      draw.current.background = new ZPrintableColor('#FFF');
      redraw();
    }

    render();
  }, [props.avatar]);

  function handleSave() {
    props.onAvatarChange(null);
  }

  function redraw() {
    draw.current.print(cvs.current.getContext('2d'));
  }

  function zoom(percent: number) {
    const sx = transform.current.scaleX + percent;
    const sy = transform.current.scaleY + percent;
    transform.current.scale(sx, sy);
    redraw();
  }

  function zoomOut() {
    zoom(-0.2);
  }

  function zoomIn() {
    zoom(0.2);
  }

  function reset() {
    transform.current.reset();
    redraw();
  }

  return (
    <ZActionForm
      className='ZProfileAvatarForm-root'
      data-testid='ZProfileAvatarForm-root'
      avatar={<PhotoCameraIcon fontSize='large' />}
      disabled={props.disabled}
      loading={props.loading}
      headerText={props.headerText}
      subHeaderText={props.subHeaderText}
      actionText={props.saveText}
      onAction={handleSave}
    >
      <Grid container justify='center' alignItems='center' direction='column' spacing={2}>
        <Grid item>
          <IconButton title='Open'>
            <FolderOpenIcon fontSize='large' />
          </IconButton>
          <IconButton title='Zoom in' onClick={zoomIn}>
            <ZoomInIcon fontSize='large' />
          </IconButton>
          <IconButton title='Zoom out' onClick={zoomOut}>
            <ZoomOutIcon fontSize='large' />
          </IconButton>
          <IconButton title='Reset' onClick={reset}>
            <RestoreIcon fontSize='large' />
          </IconButton>
        </Grid>
        <Grid item>
          <canvas className='ZProfileAvatarForm-picture' ref={cvs} height={256} width={256} />
        </Grid>
      </Grid>
    </ZActionForm>
  );
}

ZProfileAvatarForm.defaultProps = {
  headerText: 'Avatar',
  subHeaderText: 'Update your representation',
  saveText: 'Update Avatar',

  disabled: false,
  loading: false,

  avatar: null,
  onAvatarChange: noop
};
