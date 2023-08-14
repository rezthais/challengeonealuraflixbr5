import styled from "styled-components";
import { variaveis } from "../UI/variaveis";

const H1 = styled.h1`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    position: absolute;
    top: 220px;
    color: ${variaveis.corWhite};

    @media (min-width: 768px) and (max-width: 992px){
       top: 400px;
    }

    @media (min-width: 993px) {
        font-size: 46px;
        line-height: 54px;
        left: 100px;
    }
`;

function BannerTitle () {
    return (
        <H1>Aluraflix para sua transformação Digital</H1>
    )
}

export default BannerTitle;