import { Button, Collapse, Grid, IconButton, Slider, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import RestoreIcon from '@material-ui/icons/Restore';
import ZoomOutIcon from '@material-ui/icons/ZoomIn';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ZProfileAvatarMaxBytes } from '@zthun/works.core';
import { ZPrintableColor, ZPrintableDrawing, ZPrintableGroup, ZPrintableImage, ZPrintableTransform, ZToolingPan } from '@zthun/works.draw';
import { noop } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { ZPaperCard } from '../common/paper-card';
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
  const [oversized, setOversized] = useState(0);

  useEffect(render, [props.avatar]);
  useEffect(redraw);

  function render() {
    image.current.import(props.avatar).then(() => {
      transform.current.reset();
      draw.current.midground = new ZPrintableGroup([transform.current, image.current]);
      draw.current.background = new ZPrintableColor('#FFF');
      pan.current.destroy();
      pan.current.init(cvs.current, cvs.current.getContext('2d'), draw.current, transform.current);
      redraw();
    });
  }

  function redraw() {
    draw.current.print(cvs.current.getContext('2d'));
  }

  function handleSave() {
    const url = cvs.current.toDataURL();
    const [, data] = url.split(',');
    const os = Math.max(0, data.length - props.maxSize);

    setOversized(os);

    if (os === 0) {
      props.onAvatarChange(url);
    }
  }

  function handleClear() {
    setOversized(0);
    props.onAvatarChange(null);
  }

  function handleZoom(e: any, percent: number) {
    const scale = percent / 100;
    transform.current.scale(scale, scale);

    if (percent !== scalePercent) {
      setScalePercent(percent);
    } else {
      redraw();
    }
  }

  function handleFit() {
    const d = Math.max(image.current.width, image.current.height);
    const scale = 256 / d;
    transform.current.reset();
    handleZoom(null, scale * 100);
  }

  function handleReset() {
    transform.current.reset();
    handleZoom(null, 100);
  }

  function handleOpen() {
    fs.open('image/*', (file) => {
      image.current.import(file).then(() => handleFit());
    });
  }

  function handleCloseOversize() {
    setOversized(0);
  }

  function createOversizedAlert() {
    const show = oversized > 0;
    const close = (
      <IconButton data-testid='ZProfileAvatarForm-alert-oversized-close' aria-label='close' color='inherit' size='small' onClick={handleCloseOversize}>
        <CloseIcon fontSize='inherit' />
      </IconButton>
    );

    return (
      <Grid item>
        <Collapse in={show}>
          <Alert severity='error' data-testid={`ZProfileAvatarForm-alert-oversized-${show}`} action={close}>
            <AlertTitle>
              <Typography variant='subtitle1'>Max Size Reached</Typography>
            </AlertTitle>
            <Typography variant='caption'>{`The maximum size a custom avatar can have after encoding is ${props.maxSize} bytes.  The current image is over capacity by ${oversized} bytes.`}</Typography>
          </Alert>
        </Collapse>
      </Grid>
    );
  }

  function createToolbar() {
    return (
      <Grid item>
        <IconButton data-testid='ZProfileAvatarForm-btn-open' disabled={props.disabled} title='Open' onClick={handleOpen}>
          <FolderOpenIcon fontSize='small' />
        </IconButton>
        <IconButton data-testid='ZProfileAvatarForm-btn-fit' disabled={props.disabled} title='Fit' onClick={handleFit}>
          <ZoomOutMapIcon fontSize='small' />
        </IconButton>
        <IconButton data-testid='ZProfileAvatarForm-btn-reset' disabled={props.disabled} title='Reset' onClick={handleReset}>
          <RestoreIcon fontSize='small' />
        </IconButton>
      </Grid>
    );
  }

  function createDrawingArea() {
    return (
      <Grid item>
        <canvas className='ZProfileAvatarForm-picture' data-testid='ZProfileAvatarForm-picture' ref={cvs} height={256} width={256} />
      </Grid>
    );
  }

  function createZoomBar() {
    return (
      <Grid item>
        <Grid container direction='row' spacing={2}>
          <Grid item>
            <ZoomOutIcon className='ZProfileAvatarForm-zoom-icon' fontSize='small' />
          </Grid>
          <Grid item>
            <Slider className='ZProfileAvatarForm-zoom' disabled={props.disabled} data-testid='ZProfileAvatarForm-zoom' title='Zoom' value={scalePercent} defaultValue={100} min={0} max={200} onChange={handleZoom} />
          </Grid>
          <Grid item>
            <Typography className='ZProfileAvatarForm-percent' data-testid='ZProfileAvatarForm-percent'>
              {Math.round(scalePercent)}%
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function createActionButtons() {
    return (
      <Grid item className='ZProfileAvatarForm-toolbar'>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Button className='ZProfileAvatarForm-btn-save' data-testid='ZProfileAvatarForm-btn-save' fullWidth={true} variant='outlined' type='submit' disabled={props.disabled} color='primary' onClick={handleSave}>
              {props.saveText}
            </Button>
          </Grid>
          <Grid item sm={6}>
            <Button className='ZProfileAvatarForm-btn-clear' data-testid='ZProfileAvatarForm-btn-clear' fullWidth={true} variant='outlined' type='button' disabled={props.disabled} color='secondary' onClick={handleClear}>
              {props.clearText}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <ZPaperCard className='ZProfileAvatarForm-root' data-testid='ZProfileAvatarForm-root' avatar={<PhotoCameraIcon fontSize='large' />} loading={props.loading} headerText={props.headerText} subHeaderText={props.subHeaderText}>
      <Grid container justify='center' alignItems='center' direction='column' spacing={1}>
        {createOversizedAlert()}
        {createToolbar()}
        {createDrawingArea()}
        {createZoomBar()}
        {createActionButtons()}
      </Grid>
    </ZPaperCard>
  );
}

ZProfileAvatarForm.defaultProps = {
  headerText: 'Avatar',
  subHeaderText: 'Update your representation',
  saveText: 'Update Avatar',
  clearText: 'Clear',
  maxSize: ZProfileAvatarMaxBytes,

  disabled: false,
  loading: false,

  avatar: null,
  onAvatarChange: noop
};
