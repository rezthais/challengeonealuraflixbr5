import styled from 'styled-components';
import { variaveis } from '../UI/variaveis';
import { Link } from 'react-router-dom';

const Rodape = styled.footer`
   width: 100%;
   height: 80px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: ${variaveis.corPrimaria};
   color: ${variaveis.corWhite};
   font-family: 'Source Sans Pro';
   font-style: normal;
   font-weight: 600;
   font-size: 21px;

   @media (min-width: 994px) {
     background-color: ${variaveis.corGrayDark};
   }
`;

function Footer ({ larguraTela, children, to }) {

    return (
        <Rodape larguraTela ={larguraTela}><Link style={ { textDecoration: 'none', color: variaveis.corWhite}} to={to} >{children}</Link></Rodape>
    )
}

export default Footer;