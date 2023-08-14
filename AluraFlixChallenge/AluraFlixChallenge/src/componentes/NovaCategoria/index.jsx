import styled from "styled-components";
import { variaveis } from "../UI/variaveis";

const Body = styled.body`
    background-color: ${variaveis.corGrayDark};
    font-family: 'Roboto';
    font-style: normal;
    overflow-x: hidden;
`;

function NovaCategoria ({children}) {
    return (
        <Body>{children}</Body>
    )
}

export default NovaCategoria;