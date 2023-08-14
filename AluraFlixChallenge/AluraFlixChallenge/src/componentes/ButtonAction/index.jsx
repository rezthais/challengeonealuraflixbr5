import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  width: 150px;
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  padding: 10px;
  border-radius: 4px;

  &:hover {
    filter: brightness(1.1);
  }
`;

function ButtonAction({ backgroundColor ,color, children, to }) {
    return (
        <Button type='submit' backgroundColor={backgroundColor} color={color}><Link style={ { textDecoration: 'none', color: color }} to={to}>{children}</Link></Button>
    )
}

export default ButtonAction;