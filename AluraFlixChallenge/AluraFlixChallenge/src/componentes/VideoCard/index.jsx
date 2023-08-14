import { Link } from "react-router-dom";
import styled from "styled-components";

const Img = styled.img`
    width: 100%;
`;

function VideoCard ({src, to }) {
    return (
        <Link to={to}><Img src={src} /></Link>
    )
}

export default VideoCard;