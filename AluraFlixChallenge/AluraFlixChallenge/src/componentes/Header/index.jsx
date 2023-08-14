import styled from "styled-components";
import { variaveis } from "../UI/variaveis";

const Cabecalho = styled.header`
    min-width: 320px;
    max-width: 993px;
    margin: 0;
    padding: 0;
    padding-top: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 32px;
    background-color: ${variaveis.corGrayDark};

    @media (min-width: 994px) {
        min-width: 1131px;
        max-width: 1444px;
        height: 94px;
        justify-content: space-between;
    }
`;

function Header({children}) {
    return (
        <Cabecalho>
            {children}
        </Cabecalho>
    )
}

export default Header;