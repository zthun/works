import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@material-ui/core';
import { ZLoginBuilder } from '@zthun/auth.core';
import Axios from 'axios';
import React, { ChangeEvent, Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IZNewUserProperties } from './new-user-properties.interface';
import { ZNewUserState } from './new-user-state.class';
import { IZNewUserState } from './new-user-state.interface';

export class ZNewUserFormBase extends Component<IZNewUserProperties, IZNewUserState> {
  public signInClick = this.signIn.bind(this);
  public createClick = this.create.bind(this);
  public setEmailChange = this.setEmail.bind(this);
  public setPasswordChange = this.setPassword.bind(this);
  public setConfirmChange = this.setConfirm.bind(this);

  public constructor(props: IZNewUserProperties & RouteComponentProps) {
    super(props);
    this.state = new ZNewUserState();
  }

  public signIn() {
    this.props.history.push(this.props.signInRoute);
  }

  public set(updateFn: (st: IZNewUserState) => void) {
    this.setState((prev) => {
      const st = Object.assign<{}, IZNewUserState>({}, prev);
      updateFn(st);
      return st;
    });
  }

  public setCreating(creating: boolean) {
    this.set((st) => st.creating = creating);
  }

  public setEmail(email: ChangeEvent<HTMLInputElement>) {
    const val = email.target.value;
    this.set((st) => st.email = val);
  }

  public setPassword(pwd: ChangeEvent<HTMLInputElement>) {
    const val = pwd.target.value;
    this.set((st) => st.password = val);
  }

  public setConfirm(pwd: ChangeEvent<HTMLInputElement>) {
    const val = pwd.target.value;
    this.set((st) => st.confirm = val);
  }

  public async create() {
    this.setCreating(true);
    const body = new ZLoginBuilder().email(this.state.email).password(this.state.password).confirm(this.state.confirm).build();
    try {
      await Axios.post(this.props.newUserEndpoint, body);
    } catch (err) {
      // show toastrs
    } finally {
      this.setCreating(false);
    }
  }

  public render() {
    return (
      <div className='ZNewUserForm-root' data-testid='ZNewUserForm-root'>
        <div className='ZNewUserForm-create-account mb-md' data-testid='ZNewUserForm-create-account'>
          <Card>
            <CardHeader
              classes={{ root: 'pb-sm' }}
              title={<h2 className='m-no p-no'>Create account</h2>}
              subheader='Enter new account information'
              avatar={<FontAwesomeIcon icon={faUser} size='3x' />}
            />
            <CardContent>
              <form noValidate={true} autoComplete='off'>
                <TextField className='mb-md' fullWidth={true} required={true} label='Email' type='email' margin='none' variant='outlined' value={this.state.email} onChange={this.setEmailChange} />
                <TextField className='mb-md' fullWidth={true} required={true} label='Password' type='password' margin='none' variant='outlined' value={this.state.password} onChange={this.setPasswordChange} />
                <TextField className='mb-md' fullWidth={true} required={true} label='Confirm password' type='password' margin='none' variant='outlined' value={this.state.confirm} onChange={this.setConfirmChange} />
                <Button fullWidth={true} variant='contained' color='primary' onClick={this.createClick}>
                  <span>Create account</span>
                  {this.state.creating ? <CircularProgress className='ml-sm' color='inherit' size='1em' /> : null}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className='ZNewUserForm-return-to-sign-in' data-testid='ZNewUserForm-return-to-sign-in'>
          <Button className='ZNewUserForm-return-to-sign-in-btn' fullWidth={true} variant='text' color='secondary' onClick={this.signInClick}>Already have an account? Sign in.</Button>
        </div>
      </div>
    );
  }
}

export const ZNewUserForm = withRouter(ZNewUserFormBase);
