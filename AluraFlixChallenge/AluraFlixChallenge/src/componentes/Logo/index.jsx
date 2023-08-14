import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { variaveis } from '../UI/variaveis';

const LogoImage = styled.img`
    width: 105px;
    height: 25px;
    margin-left: 32px;
`;

function Logo({ to }) {
    return (
        <Link style={ { textDecoration: 'none', color: variaveis.corWhite}} to={to}><LogoImage src="/img/logo.svg" alt="Logotipo" /></Link>
    )
}

export default Logo;