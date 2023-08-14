import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import VideoCard from '../VideoCard';
import ButtonAction from '../ButtonAction';
import { variaveis } from '../UI/variaveis';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding-bottom: 10px;
  background-color: ${variaveis.corGrayDark};
  overflow-x: hidden;
  margin: 0;
`;

const H2 = styled.h2`
  color: ${variaveis.corWhite};
  line-height: 24px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
`;

const Categoria = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  padding: 0;

  @media (min-width: 993px) {
    flex-direction: row;
    margin-right: 60%;
  }
`;

const Video = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 0;

  &:hover {
    transform: scale(1.05);
  }

`;

function SectionCategories({ categories }) {
  return (
    <>
      {Object.keys(categories).map((category, index) => (
        <Section key={index}>
          <Categoria>
            <ButtonAction
              to='https://www.alura.com.br/formacoes'
              backgroundColor={variaveis[`cor${category.replace(/-/g, '')}`]}
              color={variaveis.corWhite}
            >
              {category.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())}
            </ButtonAction>
            <H2>{`Formação em ${category.toLowerCase().replace(/\b\w/g, (match) =>
              match.toUpperCase(),
            )} da Alura`}</H2>
          </Categoria>
          <AliceCarousel
            autoPlay
            autoPlayInterval={3000}
            mouseTracking
            disableDotsControls
            infinite
            items={categories[category].map((video, index) => (
              <Video key={index}>
                <VideoCard src={video.thumb} to={video.url} />
              </Video>
            ))}
            responsive={{
              0: { items: 1 },
              768: { items: 2 },
              1200: { items: 3 },
            }}
          />
        </Section>
      ))}
    </>
  );
}

export default SectionCategories;
