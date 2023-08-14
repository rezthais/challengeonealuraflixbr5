import styled from "styled-components";

const Img = styled.img`
    width: 100%;
    opacity: 0.6;
`;

function BannerImage () {
    return (
        <Img src="img/banner_image.png" alt="Banner"/>
    )
   
}

export default BannerImage;