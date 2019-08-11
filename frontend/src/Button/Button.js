import React, { Component } from 'react';
import styled from 'styled-components';

class Button extends Component {
  render() {
    return <StyledButton onClick={this.props.handleClick ? this.props.handleClick : null}>{this.props.children}</StyledButton>;
  }
}

const StyledButton = styled.button`
  color: tomato;
`;

export default Button;