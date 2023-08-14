import styled from "styled-components";
import { variaveis } from "../UI/variaveis";

const P = styled.p`

    display: none;

    @media (min-width: 993px) {
        display: block;
        position: absolute;
        width: 400px;
        height: 110px;
        left: 100px;
        top: 301px;
        color: ${variaveis.corWhite};
        line-height: 24px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        text-align: justify;
    }
   
`;

function BannerDescription () {
    return (
        <P>
            "O Aluraflix surgiu como uma forma incrível de descobrir o conteúdo que mais combina com você. Ele oferece uma experiência que aprende o que é mais relevante para você de acordo com o que você mais curte estudar".
        </P>
    )
}

export default BannerDescription;