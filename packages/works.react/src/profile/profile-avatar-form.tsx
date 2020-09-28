import { Grid } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { ZImageReader, ZPrintableDrawing, ZPrintableImage, ZPrintableTransform } from '@zthun/works.draw';
import { noop } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { ZActionForm } from '../common/action-form';
import { IZProfileAvatarFormProps } from './profile-avatar-form.props';

export function ZProfileAvatarForm(props: IZProfileAvatarFormProps) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const draw = useRef<ZPrintableDrawing>(new ZPrintableDrawing());

  useEffect(() => {
    async function render() {
      const image = new ZPrintableImage(new ZImageReader());
      await image.import(props.avatar);
      const sx = 256 / image.width;
      const sy = 256 / image.height;
      const scale = new ZPrintableTransform().scale(sx, sy);
      draw.current.background = image;
      draw.current.backstage = scale;
      draw.current.print(cvs.current.getContext('2d'));
    }

    render();
  }, [props.avatar]);

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
