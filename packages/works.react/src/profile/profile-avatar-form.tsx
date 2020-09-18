import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { noop } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { ZActionForm } from '../common/action-form';
import { ZDrawing } from '../draw/drawing.class';
import { ZPrintableImage } from '../draw/printable-image.class';
import { IZProfileAvatarFormProps } from './profile-avatar-form.props';
import { ZTransform } from '../draw/transform.class';
import { ZPrintableLayer } from '../draw/printable-layer.class';
import { Grid } from '@material-ui/core';

export function ZProfileAvatarForm(props: IZProfileAvatarFormProps) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const draw = useRef<ZDrawing>(new ZDrawing());

  useEffect(() => {
    async function render() {
      const image = new ZPrintableImage();
      await image.load(props.avatar);
      const sx = 256 / image.width;
      const sy = 256 / image.height;
      const background = new ZPrintableLayer([image], new ZTransform().scale(sx, sy));
      draw.current.background = background;
      draw.current.print(cvs.current.getContext('2d'));
    }

    render();
  }, [props.avatar]);

  useEffect(() => {
    draw.current.print(cvs.current.getContext('2d'));
  });

  function handleSave() {
    props.onAvatarChange(null);
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
      <Grid container justify='center'>
        <Grid item>
          <canvas ref={cvs} height={256} width={256} />
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
