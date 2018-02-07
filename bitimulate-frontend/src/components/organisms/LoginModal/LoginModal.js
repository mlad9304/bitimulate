import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import { Modal, Input, Button, TextButton, SocialLoginButton } from 'components';


const cx = classNames.bind(styles);

const LoginModal = ({visible, mode, onChangeMode}) => {
  const isLogin = mode === 'login';
  const modeText = isLogin ? 'Login' : 'Signup';
  const invertedText = isLogin ? 'Signup' : 'Login';

  return (
    <Modal visible={visible}>
      <div className={cx('login-modal')}>
        <div className={cx('bar')}></div>
        <div className={cx('content')}>
          <h3>{modeText} with email</h3>
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
              <TextButton right onClick={onChangeMode} >{invertedText}</TextButton>
            </div>
            <div className={cx('separator')}>
              <div className={cx('or')}>OR</div>
            </div>
            <h3>{modeText} with Social Account</h3>
            <SocialLoginButton />
        </div>
      </div>
    </Modal>
  )
}

export default LoginModal;
