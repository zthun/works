import { Grid, IconButton, Slider, Typography } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import RestoreIcon from '@material-ui/icons/Restore';
import ZoomOutIcon from '@material-ui/icons/ZoomIn';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { ZImageReader, ZPrintableColor, ZPrintableDrawing, ZPrintableGroup, ZPrintableImage, ZPrintableTransform, ZToolingPan } from '@zthun/works.draw';
import { noop } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
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
  const [zoom, setZoom] = useState(100);

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

  useEffect(() => {
    redraw();
  });

  function handleSave() {
    props.onAvatarChange(null);
  }

  function redraw() {
    draw.current.print(cvs.current.getContext('2d'));
  }

  function zoomChange(e: any, percent: number) {
    const scale = percent / 100;
    transform.current.scale(scale, scale);

    if (percent !== zoom) {
      setZoom(percent);
    } else {
      redraw();
    }
  }

  function fit() {
    const d = Math.max(image.current.width, image.current.height);
    const scale = 256 / d;
    transform.current.reset();
    zoomChange(null, scale * 100);
  }

  function reset() {
    transform.current.reset();
    zoomChange(null, 100);
  }

  function open() {
    fs.open('image/*', (file) => {
      image.current.import(file).then(() => fit());
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
        <Grid item>
          <Grid container direction='row' spacing={2}>
            <Grid item>
              <ZoomOutIcon className='ZProfileAvatarForm-zoom-icon' fontSize='small' />
            </Grid>
            <Grid item>
              <Slider className='ZProfileAvatarForm-zoom' title='Zoom' value={zoom} defaultValue={100} min={0} max={200} onChange={zoomChange} />
            </Grid>
            <Grid item>
              <Typography className='ZProfileAvatarForm-percent'>{Math.round(zoom)}%</Typography>
            </Grid>
          </Grid>
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
