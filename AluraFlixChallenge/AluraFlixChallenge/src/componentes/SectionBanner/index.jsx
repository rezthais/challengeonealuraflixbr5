import styled from "styled-components";
import { variaveis } from "../UI/variaveis";

const Section = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10px;
    background-color: ${variaveis.corGrayDark};
    height: 300px;

    @media (min-width: 768px) and (max-width: 992px){
       height: 500px;
    }

    @media (min-width: 993px) {
        background-image: url('img/banner_image.png');
        background-repeat: no-repeat;
        background-size: contain;
        position: relative;
        height: 700px;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${variaveis.corGrayDark}; 
            opacity: 0.6; /* ajuste o valor para o nível de opacidade desejado */
        }
    }

    @media (min-width: 1580px) {
        background-size: cover;
    }
`;

function SectionBanner ({children}) {
    return(
        <Section>
            {children}
        </Section>
    )
}

export default SectionBanner;