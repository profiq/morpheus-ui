// @flow

import React, { Component } from 'react'
import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native-web'

type State = {
  on: boolean,
}

type Props = {
  defaultState?: boolean,
  disabled?: boolean,
  dark?: boolean,
  control?: Function,
  onPress?: Function,
}

const Dot = styled.View`
  background-color: white;
  height: 20px;
  width: 20px;
  left: 20px;
  border-radius: 50%;
  position: absolute;
  background-color: #fff;
  ${props =>
    !props.on &&
    css`
      left: 0px;
      transition: all 0.3s;
    `};
  ${props =>
    props.on &&
    css`
      left: 20px;
      transition: all 0.3s;
    `};
  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
    `};
  ${props =>
    props.dark &&
    css`
      background-color: #1a2d57;
    `};
`
const DotBackground = styled.View`
  width: 40px;
  height: 18px;
  background-color: #fff;
  opacity: 0.2;
  border-radius: 25px;
  ${props =>
    props.dark &&
    css`
      background-color: #1a2d57;
      opacity: 0.6;
    `};
`

const Container = styled.View`
  justify-content: center;
  display: flex;
  cursor: pointer;
  border-radius: 25px;
  ${props =>
    props.disabled &&
    css`
      cursor: auto;
    `};
`

export default class Switch extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.onPressed = this.onPressed.bind(this)
    this.handleOn = this.handleOn.bind(this)
  }
  state = {
    on:
      (this.props.defaultState && this.props.defaultState) ||
      (this.props.control && this.props.control),
  }

  onPressed() {
    if (!this.props.disabled && !this.props.control) {
      this.setState({ on: !this.state.on })
      this.props.onPress && this.props.onPress()
    }
  }

  handleOn() {
    if (this.props.control) {
      this.props.onPress && this.props.onPress()
      return this.props.control
    } else {
      return this.state.on
    }
  }

  render() {
    const { disabled, dark, onPress } = this.props
    return (
      <TouchableOpacity onPress={this.onPressed}>
        <Container disabled={disabled}>
          <DotBackground dark={dark} />
          <Dot
            on={this.props.control ? this.props.control : this.state.on}
            dark={dark}
            disabled={disabled}
          />
        </Container>
      </TouchableOpacity>
    )
  }
}
