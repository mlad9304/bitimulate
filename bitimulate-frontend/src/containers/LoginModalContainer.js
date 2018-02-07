import React, { Component } from 'react';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { LoginModal } from 'components';
import onClickOutside from "react-onclickoutside";
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';

class LoginModalContainer extends Component {

  handleClose = () => {
    const { visible, BaseActions, AuthActions } = this.props;
    if(!visible) return;
    BaseActions.setScreenMaskVisibility(false);
    AuthActions.toggleLoginModal();
  }

  handleClickOutside = evt => {
    this.handleClose();
  };

  handleChangeMode = () => {
    const { mode, AuthActions } = this.props;
    const inverted = mode === 'login' ? 'register' : 'login';
    AuthActions.setModalMode(inverted);
  }

  handleChangeInput = (e) => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;

    AuthActions.changeInput({
      name,
      value
    })
  }

  render() {
    const {visible, mode, form} = this.props;
    const {
      handleChangeMode,
      handleChangeInput
    } = this;

    return (
      <LoginModal
        visible={visible}
        mode={mode}
        forms={form}
        onChangeInput={handleChangeInput}
        onChangeMode={handleChangeMode}/>
    );
  }
}

export default connect(
  (state) => ({
    visible: state.auth.getIn(['modal', 'visible']),
    mode: state.auth.getIn(['modal', 'mode']),
    form: state.auth.get('form')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(onClickOutside(LoginModalContainer));
