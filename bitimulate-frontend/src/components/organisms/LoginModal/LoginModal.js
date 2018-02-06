import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import { Modal, Input, Button, TextButton } from 'components';


const cx = classNames.bind(styles);

const LoginModal = ({visible}) => {
  return (
    <Modal visible={visible}>
      <div className={cx('login-modal')}>
        <div className={cx('bar')}></div>
        <div className={cx('content')}>
          <h3>Login with email</h3>
            <div className={cx('form')}>
              <Input
                name="email"
                fullWidth big
                placeholder="Email"/>
              <Input
                name="password"
                fullWidth big
                placeholder="Password"
                type="password"/>
            </div>
            <Button
              flat color="teal"
              flex padding="0.6rem"
              className={cx('login')}>Login</Button>
            <div className={cx('login-foot')}>
              <TextButton>Forgot password</TextButton>
              <TextButton right >Signup</TextButton>
            </div>
            <div className={cx('separator')}>
              <div className={cx('or')}>OR</div>
            </div>
            <h3>Login with Social Account</h3>
        </div>
      </div>
    </Modal>
  )
}

export default LoginModal;
