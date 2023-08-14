import styled from "styled-components";

const Iframe = styled.iframe`
    opacity: 0.6;
    width: 100%;
    height: 809px;

    @media (min-width: 993px) {
        width: 500px;
        height: 333.58px;
        opacity: 1;
        position: absolute;
        left: 55%;
        top: 150px;
    }
`;


function BannerVideo () {
    return (
            <Iframe src="https://www.youtube.com/embed/Z-N5Fr9P-GU" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></Iframe>
        )
}

export default BannerVideo;