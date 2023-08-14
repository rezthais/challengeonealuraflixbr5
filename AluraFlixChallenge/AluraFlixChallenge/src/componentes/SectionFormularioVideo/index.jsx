import styled from "styled-components";
import { variaveis } from "../UI/variaveis";
import { FormControl, Button } from "@mui/material";
import CampoTexto from "../CampoTexto";
import ButtonAction from "../ButtonAction";
import { useState, useEffect, useRef } from "react";

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 950px;

    @media (min-width: 993px) {
        height: 750px;
    }
`;

const Legend = styled.legend`
    color: ${variaveis.corWhite};
    text-align: center;
    font-weight: 400;
    font-size: 35px;
    line-height: 41px;
    padding-bottom: 30px;
    
    @media (min-width: 993px) {
        font-size: 60px;
        line-height: 70px;
    }
`;

const P = styled.p`
  color: ${variaveis.corGrayLighter};
  font-weight: bold;
  font-size: 20px;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 30px;
    flex-direction: column;

    @media (min-width: 993px) {
        flex-direction: row;
    }
`;

const Span =styled.span`
    color: ${variaveis.corErroDark};
`;

function SectionFormularioVideo({ titulo }) {

    const [title, setTitle] = useState('');
    const [video, setVideo] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [security, setSecurity] = useState('');
    const [validationError, setValidationError] = useState('');
    const [videoError, setVideoError] = useState('');
    const [imageError, setImageError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [categories, setCategories] = useState([]);
    const existingData = useRef([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/categories');
          if (!response.ok) {
            throw new Error('Erro ao obter os dados.');
          }
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

    const newVideo = {
      title: title,
      url: video,
      thumb: image,
    };

    const categoryData = {
      [category]: [newVideo],
    };
  
    useEffect(() => {
      const updateData = async () => {
        try {
          const response = await fetch('http://localhost:3001/categories');
          if (!response.ok) {
            throw new Error('Erro ao obter os dados atualizados.');
          }
          const updatedData = await response.json();
          
          // Armazena os dados existentes antes da atualização
          existingData.current = updatedData;
          
          // Mescla os dados existentes com os novos dados da requisição POST
          const mergedData = { ...updatedData, ...categoryData };
          setCategories(mergedData);
        } catch (error) {
          console.error(error);
        }
      };
      
      if (submitted) {
        updateData();
      }
      
    }, [submitted]);
  

    const handleTitleChange = (event) => {
      const value = event.target.value;
      setTitle(value);
      if (value.length < 3) {
        setValidationError('O campo título deve conter pelo menos 3 caracteres.');
      } else {
        setValidationError('');
      }
    };

    const handleVideoChange = (event) => {
        const value = event.target.value;
        setVideo(value);
        // Expressão regular para validar a URL do vídeo
        const urlRegexVideo = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        if (!urlRegexVideo.test(value)) {
            setVideoError("Link do vídeo inválido. (ex: https://www.youtube.com/watch?v=90NcVNsKGik)");
        } else {
            setVideoError("");
        }
    };

    const handleImageChange = (event) => {
      const value = event.target.value;
      setImage(value);
      // Expressão regular para validar a URL da imagem
      const urlRegexImg = /^(https?:\/\/)?([^\s\/\?\.#]+\.?)+(\/[^\s]*)?$/i;
      if (!value.trim() || !urlRegexImg.test(value.trim())) {
        setImageError("URL da imagem inválida. (ex: https://img.youtube.com/vi/dvd3pNYh7So/hqdefault.jpg)");
      } else {
        setImageError("");
      }
    };

    const handleCategoryChange = (event) => {
       setCategory(event.target.value);
    };
    
    
    const handleSubmit = async (event) => {

        event.preventDefault();

        if (title.length < 3) {
          setValidationError('O campo título deve conter pelo menos 3 caracteres.');
          setSubmitted(false);
          return;
        }

        if (videoError !== "") {
          setSubmitted(false);
          return;
        }

        if (imageError !== "") {
          setSubmitted(false);
          return;
        }

        if (category.length === 0) {
          setSubmitted(false);
          return;
        }

        const newVideo = {
          title: title,
          url: video,
          thumb: image,
        };

        const categoryData = {
          [category]: [newVideo],
        };

         // Limpeza dos campos do formulário
         setTitle("");
         setVideo("");
         setImage("");
         setCategory("");
         setSecurity("");

        const existingCategory = Object.keys(categories).find(categoryKey => categoryKey === category);

        if (existingCategory) {
          if (Array.isArray(categories[existingCategory])) {
            categories[existingCategory].push(newVideo);
          } else {
            categories[existingCategory] = [categories[existingCategory], newVideo];
          }
        } 
      
        try {
          const response = await fetch('http://localhost:3001/categories', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
          });
      
          if (!response.ok) {
            throw new Error('Erro ao enviar o formulário.');
          }
      
          console.log('Dados enviados com sucesso!');
          setSubmitted(true);
      
          // Mescla os dados existentes com os novos dados da requisição POST
          const mergedData = { ...existingData.current, ...categoryData };
          setCategories(mergedData);
        } catch (error) {
          console.error(error);
          setSubmitted(false);
        }

        try {
          const response = await fetch('http://localhost:3001/categories', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(categories),
          });
      
          if (!response.ok) {
            throw new Error('Erro ao enviar o formulário.');
          }
      
          console.log('Dados atualizados com sucesso!');
          setSubmitted(true);
        } catch (error) {
          console.error(error);
          setSubmitted(false);
        }

        setSubmitted(true);

        console.log(title, video, image, description, category, security);
    };

    const handleClick = async () => {
      try {
        const response = await fetch('http://localhost:3001/categories');
        if (!response.ok) {
          throw new Error('Erro ao obter os dados.');
        }
        const serverData = await response.json();
    
        // Verifica se os dados inseridos estão na lista do servidor
        const updatedData = { ...serverData };
        let hasChanges = false;
        Object.entries(updatedData).forEach(([category, videos]) => {
          const updatedVideos = videos.filter(
            (video) =>
              video.title !== title ||
              video.url !== newVideo.url ||
              video.thumb !== image
          );
          if (updatedVideos.length !== videos.length) {
            updatedData[category] = updatedVideos;
            hasChanges = true;
          }
        });
    
        if (!hasChanges) {
          console.log('Os dados inseridos não foram encontrados na lista do servidor.');
          return;
        }
    
        const deleteResponse = await fetch('http://localhost:3001/categories', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
    
        if (!deleteResponse.ok) {
          throw new Error('Erro ao excluir os dados do servidor.');
        }
    
        console.log('Dados excluídos com sucesso!');
        setCategories(updatedData);
      } catch (error) {
        console.error(error);
      }

       // Limpeza dos campos do formulário
       setTitle("");
       setVideo("");
       setImage("");
       setCategory("");
       setSecurity("");
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <FormControl>
          <Legend>{titulo}</Legend>
          <CampoTexto
            onChange={handleTitleChange}
            placeholder="Título"
            type="text"
            value={title}
            error={validationError !== ''}
            helperText={validationError}
            required
            />
          {validationError && <Span>{validationError}</Span>}
          <CampoTexto
            onChange={handleVideoChange}
            placeholder="Link do Vídeo"
            type="url"
            value={video}
            error={videoError !== ''}
            helperText={videoError}
            required
          />
         {videoError && <Span>{videoError}</Span>}
          <CampoTexto
            onChange={handleImageChange}
            placeholder="Link da imagem do Vídeo"
            type="url"
            value={image}
            error={imageError !== ''}
            helperText={imageError}
            required
          />
        {imageError && <Span>{imageError}</Span>}
          <CampoTexto
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descrição"
            type="text"
            value={description}
          />
          <CampoTexto
            onChange={handleCategoryChange}
            placeholder="Categoria"
            type="text"
            value={category}
            required
          />
          <CampoTexto
            onChange={(event) => setSecurity(event.target.value)}
            placeholder="Código de Segurança"
            type="number"
            value={security}
            required
          />
          <ButtonContainer>
            <Button onClick={handleSubmit} variant="contained">
              Salvar
            </Button>
            <Button onClick={handleClick} variant="outlined">Deletar</Button>
            <ButtonAction backgroundColor={variaveis.corPrimaria} color={variaveis.corWhite} to="/novacategoria">
              NOVA CATEGORIA
            </ButtonAction>
          </ButtonContainer>
          {submitted && <P>Formulário enviado com sucesso!</P>}
        </FormControl>
      </Form>
    );
  }
  
  export default SectionFormularioVideo;