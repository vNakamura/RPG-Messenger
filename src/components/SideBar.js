// @flow

import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import transparentize from 'polished/lib/color/transparentize';
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';

import FaCog from 'react-icons/lib/fa/cog';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import FaClose from 'react-icons/lib/fa/close'

import TopBar from './TopBar';
import Scrollable from './Scrollable';
import PushToBottom from './PushToBottom';
import Avatar from './Avatar';
import Button from './Buttons/Button';
import MenuItem from './MenuItem';
import {toggle_sidebar, fix_sidebar} from '../actions/ui';
import type {State} from '../types/State';

const slideLeft = (props) => {
  return keyframes`
  	from {
  		transform: translateX(-${props.theme.sidebar.width}px);
  	}
  	to {
  		transform: translateX(0);
  	}
  `;
};
const slideRight = (props) => {
  return keyframes`
  	from {
  		transform: translateX(0);
  	}
  	to {
      transform: translateX(-${props.theme.sidebar.width}px);
  	}
  `;
};
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const selectSlideAnimation = (props) => {
  if (props.fixed) return 'none';
  if (props.animatingExit) return (slideRight(props));
  if (props.visible) return slideLeft(props);
  return 'none';
};

const Container = styled.div `
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.sidebar.bg};
  width: 16rem;
  min-width: ${props => props.theme.sidebar.width}px;
  color: ${props => props.theme.sidebar.textColor};
  transform: translateX(-${props => props.fixed || props.visible? 0 : props.theme.sidebar.width}px);
  animation: ${selectSlideAnimation} .3s ease-out;
  animation-fill-mode: forwards;

  @media (max-width: ${props => props.theme.sidebar.breakpoint-1}px) {
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
  }
`;

const Overlay = styled.div `
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.theme.sidebar.width}px;
  width: 100vw;
  background-color: ${props => transparentize(0.3, props.theme.sidebar.overlayColor)};
  box-shadow: rgba(0,0,0,0.3) 8px 0 16px inset;
  animation: ${props => props.animatingExit? fadeOut : fadeIn} .2s ease-out;
  animation-fill-mode: forwards;
`;

class SideBar extends Component {
  state: {
    animatingExit: boolean,
  } = {
    animatingExit: false,
  }
  updateDimensions = debounce(() => {
    const shouldBeFixed: boolean = window.innerWidth > this.props.breakpoint;
    if(this.props.fixed !== shouldBeFixed) {
      this.props.dispatch(fix_sidebar(shouldBeFixed));
    }
  }, 100);
  componentDidMount = () => {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.visible !== this.props.visible) {
      this.setState({animatingExit: false});
    }
  }

  handleClose = () => {
    this.setState({animatingExit: true}, () => {
      window.setTimeout(() => {
        this.props.dispatch(toggle_sidebar(false));
      }, 300);
    });
  };
  render() {
    return (
      <Container
        visible={this.props.visible}
        fixed={this.props.fixed}
        animatingExit={this.state.animatingExit}
      >
        <TopBar
          text="Pocket Campaign"
        />
        <Scrollable startFromBottom>
          <PushToBottom>
            <MenuItem to="sign-out" icon={FaSignOut} text="Sign Out"/>
            <MenuItem to="settings" icon={FaCog} text="Settings"/>
            <MenuItem to="asd" text="Asd"/>
            <MenuItem to="asd" text="Asd"/>
          </PushToBottom>
        </Scrollable>
        <UserBar>
          <Avatar src="https://api.adorable.io/avatars/128/asd"/>
          <Name>Nome do Usuário</Name>
          {this.props.fixed ? null : <Button onClick={this.handleClose}><FaClose /></Button>}
        </UserBar>
        {!this.props.fixed && this.props.visible ? <Overlay onClick={this.handleClose} animatingExit={this.state.animatingExit} /> : null}
      </Container>
    );
  };
}
const mapStateToProps = (state: State) => {
  const {visible, fixed} = state.ui.sidebar;

  return {
    visible,
    fixed,
  };
};
export default connect(mapStateToProps)(SideBar);


const UserBar = styled.div `
  display: flex;
  align-items: center;
`;

const Name = styled.h4 `
  flex: 1;
`;
