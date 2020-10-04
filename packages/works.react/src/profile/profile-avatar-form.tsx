import { Grid, IconButton, Slider, Typography } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import RestoreIcon from '@material-ui/icons/Restore';
import ZoomOutIcon from '@material-ui/icons/ZoomIn';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { ZPrintableColor, ZPrintableDrawing, ZPrintableGroup, ZPrintableImage, ZPrintableTransform, ZToolingPan } from '@zthun/works.draw';
import { noop } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { ZActionForm } from '../common/action-form';
import { useFileSelect } from '../file/file-select.context';
import { useImageReader } from '../image/image-reader.context';
import { IZProfileAvatarFormProps } from './profile-avatar-form.props';

export function ZProfileAvatarForm(props: IZProfileAvatarFormProps) {
  const fs = useFileSelect();
  const ir = useImageReader();
  const cvs = useRef<HTMLCanvasElement>(null);
  const transform = useRef<ZPrintableTransform>(new ZPrintableTransform());
  const image = useRef<ZPrintableImage>(new ZPrintableImage(ir));
  const draw = useRef<ZPrintableDrawing>(new ZPrintableDrawing());
  const pan = useRef<ZToolingPan>(new ZToolingPan());
  const [scalePercent, setScalePercent] = useState(100);

  useEffect(() => {
    async function render() {
      await image.current.import(props.avatar);
      transform.current.reset();
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

  function save() {
    props.onAvatarChange(cvs.current.toDataURL());
  }

  function redraw() {
    draw.current.print(cvs.current.getContext('2d'));
  }

  function zoom(e: any, percent: number) {
    const scale = percent / 100;
    transform.current.scale(scale, scale);

    if (percent !== scalePercent) {
      setScalePercent(percent);
    } else {
      redraw();
    }
  }

  function fit() {
    const d = Math.max(image.current.width, image.current.height);
    const scale = 256 / d;
    transform.current.reset();
    zoom(null, scale * 100);
  }

  function reset() {
    transform.current.reset();
    zoom(null, 100);
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
      onAction={save}
    >
      <Grid container justify='center' alignItems='center' direction='column' spacing={1}>
        <Grid item>
          <IconButton data-testid='ZProfileAvatarForm-btn-open' disabled={props.disabled} title='Open' onClick={open}>
            <FolderOpenIcon fontSize='small' />
          </IconButton>
          <IconButton data-testid='ZProfileAvatarForm-btn-fit' disabled={props.disabled} title='Fit' onClick={fit}>
            <ZoomOutMapIcon fontSize='small' />
          </IconButton>
          <IconButton data-testid='ZProfileAvatarForm-btn-reset' disabled={props.disabled} title='Reset' onClick={reset}>
            <RestoreIcon fontSize='small' />
          </IconButton>
        </Grid>
        <Grid item>
          <canvas className='ZProfileAvatarForm-picture' data-testid='ZProfileAvatarForm-picture' ref={cvs} height={256} width={256} />
        </Grid>
        <Grid item>
          <Grid container direction='row' spacing={2}>
            <Grid item>
              <ZoomOutIcon className='ZProfileAvatarForm-zoom-icon' fontSize='small' />
            </Grid>
            <Grid item>
              <Slider className='ZProfileAvatarForm-zoom' disabled={props.disabled} data-testid='ZProfileAvatarForm-zoom' title='Zoom' value={scalePercent} defaultValue={100} min={0} max={200} onChange={zoom} />
            </Grid>
            <Grid item>
              <Typography className='ZProfileAvatarForm-percent' data-testid='ZProfileAvatarForm-percent'>
                {Math.round(scalePercent)}%
              </Typography>
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
