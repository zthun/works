import { Grid, IconButton } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import RestoreIcon from '@material-ui/icons/Restore';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { ZImageReader, ZPrintableColor, ZPrintableDrawing, ZPrintableGroup, ZPrintableImage, ZPrintableTransform, ZToolingPan } from '@zthun/works.draw';
import { noop } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { ZActionForm } from '../common/action-form';
import { useFileSelect } from '../file/file-select.context';
import { IZProfileAvatarFormProps } from './profile-avatar-form.props';

export function ZProfileAvatarForm(props: IZProfileAvatarFormProps) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const transform = useRef<ZPrintableTransform>(new ZPrintableTransform());
  const image = useRef<ZPrintableImage>(new ZPrintableImage(new ZImageReader()));
  const draw = useRef<ZPrintableDrawing>(new ZPrintableDrawing());
  const pan = useRef<ZToolingPan>(new ZToolingPan());
  const fs = useFileSelect();

  useEffect(() => {
    async function render() {
      await image.current.import(props.avatar);
      draw.current.midground = new ZPrintableGroup([transform.current, image.current]);
      draw.current.background = new ZPrintableColor('#FFF');
      pan.current.destroy();
      pan.current.init(cvs.current, cvs.current.getContext('2d'), draw.current, transform.current);
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

  function fit() {
    const sx = 256 / image.current.width;
    const sy = 256 / image.current.height;
    transform.current.reset();
    transform.current.scale(sx, sy);
    redraw();
  }

  function reset() {
    transform.current.reset();
    redraw();
  }

  function open() {
    fs.open('image/*', (file) => {
      image.current.import(file).then(() => {
        transform.current.reset();
        redraw();
      });
    });
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
      <Grid container justify='center' alignItems='center' direction='column' spacing={1}>
        <Grid item>
          <IconButton title='Open' onClick={open}>
            <FolderOpenIcon fontSize='small' />
          </IconButton>
          <IconButton title='Zoom in' onClick={zoomIn}>
            <ZoomInIcon fontSize='small' />
          </IconButton>
          <IconButton title='Zoom out' onClick={zoomOut}>
            <ZoomOutIcon fontSize='small' />
          </IconButton>
          <IconButton title='Fit' onClick={fit}>
            <ZoomOutMapIcon fontSize='small' />
          </IconButton>
          <IconButton title='Reset' onClick={reset}>
            <RestoreIcon fontSize='small' />
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
