import React, { Component } from 'react';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { LoginModal } from 'components';
import onClickOutside from "react-onclickoutside";
import * as baseActions from 'store/modules/base';

class LoginModalContainer extends Component {

  handleClickOutside = evt => {
    const { visible, BaseActions } = this.props;
    if(!visible) return;
    BaseActions.setScreenMaskVisibility(false);
  };
  render() {
    const {visible} = this.props;
    return (
      <LoginModal visible={visible} />
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['screenMask', 'visible'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(onClickOutside(LoginModalContainer));
