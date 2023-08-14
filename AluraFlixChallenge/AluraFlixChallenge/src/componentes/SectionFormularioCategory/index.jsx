import styled from "styled-components";
import { variaveis } from "../UI/variaveis";
import CampoTexto from "../CampoTexto";
import { FormControl, Button, InputLabel, Select, MenuItem, TextField, TableHead, TableRow, TableCell, TableBody, TableContainer, Table, Paper } from "@mui/material";
import { useState, useEffect } from "react";

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;

    @media (min-width: 993px) {
        height: 700px;
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
  margin: 30px 0;
  text-align: left;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 30px;
    flex-direction: column;
    margin: 20px 0;

    @media (min-width: 993px) {
        flex-direction: row;
    }
`;

const Span =styled.span`
  color: ${variaveis.corErroDark};
`;

function SectionFormularioCategory ({ titulo, variaveis }) {

    const [category, setCategory] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [descricao, setDescricao] = useState('');
    const [codigoSeguranca, setCodigoSeguranca] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [selectedValueError, setSelectedValueError] = useState('');
    const [codigoSegurancaError, setCodigoSegurancaError] = useState('');
    const [categories, setCategories] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [existingCategories, setExistingCategories] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedNome, setEditedNome] = useState('');
    const [editedDescricao, setEditedDescricao] = useState('');
    const [videosList, setVideosList] = useState({});

    const handleEdit = (index) => {
      setEditIndex(index);
      setEditedNome(dataList[index].nome);
      setEditedDescricao(dataList[index].descricao);
    };

    const handleSave = (index) => {
      const updatedDataList = [...dataList];
      const editedCategory = updatedDataList[index].nome;
      const editedVideoTitle = updatedDataList[index].descricao;
    
      // Atualiza a lista de vídeos da categoria editada
      const updatedVideosList = { ...videosList };
      updatedVideosList[editedCategory].forEach((video) => {
        if (video.title === editedVideoTitle) {
          video.title = editedDescricao;
        }
      });
    
      // Atualiza a lista de categorias com os vídeos atualizados
      const updatedCategories = { ...categories, ...updatedVideosList };
    
      // Atualiza os dados no servidor
      fetch('http://localhost:3001/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategories),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Categorias atualizadas:', updatedCategories);
            setCategories(updatedCategories);
            setVideosList(updatedVideosList);
            setEditIndex(null);
          } else {
            throw new Error('Erro ao atualizar categorias');
          }
        })
        .catch((error) => {
          console.error('Erro ao atualizar categorias:', error);
        });
    };
    
    const handleRemove = (index) => {
      const removedCategory = dataList[index].nome;
      const removedVideoTitle = dataList[index].descricao;
    
      // Remove o vídeo da lista de vídeos da categoria
      const updatedVideosList = { ...videosList };
      updatedVideosList[removedCategory] = updatedVideosList[removedCategory].filter(
        (video) => video.title !== removedVideoTitle
      );
    
      // Atualiza a lista de categorias com os vídeos atualizados
      const updatedCategories = { ...categories, ...updatedVideosList };
    
      // Atualiza os dados no servidor
      fetch('http://localhost:3001/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategories),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Categorias atualizadas:', updatedCategories);
            setCategories(updatedCategories);
            setVideosList(updatedVideosList);
          } else {
            throw new Error('Erro ao atualizar categorias');
          }
        })
        .catch((error) => {
          console.error('Erro ao atualizar categorias:', error);
        });
    };
    
    useEffect(() => {
      fetchCategories();
    }, []);
  
    const fetchCategories = () => {
      fetch("http://localhost:3001/categories")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erro ao obter a lista de categorias");
          }
        })
        .then((data) => {
          setCategories(data);
          setExistingCategories(data.categories);
          setDataList(formatDataList(data));
          setVideosList(data);
        })
        .catch((error) => {
          console.error("Erro ao obter a lista de categorias:", error);
        });
    };
  
    const formatDataList = (categories) => {
      const dataList = [];
  
      for (const category in categories) {
        const categoryData = categories[category];
  
        for (const data of categoryData) {
          dataList.push({
            nome: category,
            descricao: data.title,
            editar: data.url,
            remover: data.thumb,
          });
        }
      }
  
      return dataList;
    };
  
  
    const handleCategoryChange = (event) => {
      if (event.target.value.trim() !== '') {
        setCategory(event.target.value);
      } else {
        setCategoryError('O campo não pode ser vazio');
      }
    };
    
    const handleDescricaoChange = (event) => {
      setDescricao(event.target.value);
    };
    
    const handleCodigoSegurancaChange = (event) => {
      if (event.target.value.trim() !== '') {
        setCodigoSeguranca(event.target.value);
      } else {
        setCodigoSegurancaError('O campo não pode ser vazio');
      }
    };
    
    const handleSelectChange = (event) => {
      if (event.target.value.trim() !== '') {
        setSelectedValue(event.target.value);
      } else {
        setSelectedValueError('O campo não pode ser vazio');
      }
    };

    const handleDeleteCategory = (categoryName) => {
      const categoryUrl = `http://localhost:3000/categories/${categoryName}`;
    
      // Verifica se a categoria existe no servidor
      fetch(categoryUrl)
        .then((response) => {
          if (response.ok) {
            // A categoria existe, prossegue com a exclusão
            const updatedCategories = { ...categories };
    
            if (updatedCategories.hasOwnProperty(categoryName)) {
              delete updatedCategories[categoryName];
            }
    
            setCategories(updatedCategories);
            setDataList(formatDataList(updatedCategories));
    
            fetch(categoryUrl, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log("Categoria excluída com sucesso");
                  // Atualize a lista de categorias no servidor após a exclusão
                  fetchCategories();
                  // Após a exclusão, envie a lista atualizada para o servidor
                  fetch(`http://localhost:3000/categories`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedCategories),
                  })
                    .then((response) => {
                      if (response.ok) {
                        return response.json();
                      } else {
                        throw new Error("Erro ao atualizar categorias");
                      }
                    })
                    .then((data) => {
                      console.log("Categorias atualizadas no servidor:", data);
                    })
                    .catch((error) => {
                      console.error("Erro ao atualizar categorias no servidor:", error);
                    });
                } else {
                  throw new Error("Erro ao excluir categoria");
                }
              })
              .catch((error) => {
                console.error("Erro ao excluir categoria:", error);
              });
          } else {
            throw new Error("A categoria não existe no servidor");
          }
        })
        .catch((error) => {
          console.error("Erro ao verificar a categoria:", error);
        });
    };
  
    const handleDeleteFormSubmit = (event) => {
      event.preventDefault();
    
      if (category.trim() !== '') {
        handleDeleteCategory(category);
      }

      // Limpeza dos campos do formulário
      setCategory("");
      setSelectedValue("");
      setDescricao("");
      setCodigoSeguranca("");
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
    
      let categoryError = '';
      let selectedValueError = '';
      let codigoSegurancaError = '';
    
      if (category.trim() === '') {
        categoryError = 'O campo não pode ser vazio';
      }
    
      if (selectedValue.trim() === '') {
        selectedValueError = 'O campo não pode ser vazio';
      }
    
      if (codigoSeguranca.trim() === '') {
        codigoSegurancaError = 'O campo não pode ser vazio';
      }
    
      setCategoryError(categoryError);
      setSelectedValueError(selectedValueError);
      setCodigoSegurancaError(codigoSegurancaError);
    
      if (categoryError === '' && selectedValueError === '' && codigoSegurancaError === '') {
        const newCategory = {
          [category]: [
            {
              title: "",
              url: "",
              thumb: "",
            },
          ],
        };
    
        fetch("http://localhost:3001/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Erro ao criar nova categoria");
            }
          })
          .then((data) => {
            console.log("Nova categoria criada:", data);
            const updatedCategories = {
              ...categories,
              ...newCategory,
            };
    
            fetch("http://localhost:3001/categories", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedCategories),
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error("Erro ao atualizar categorias");
                }
              })
              .then((data) => {
                console.log("Categorias atualizadas:", data);
                setCategories(data);
                setDataList(formatDataList(data));
              })
              .catch((error) => {
                console.error("Erro ao atualizar categorias:", error);
              });
    
            fetchCategories(); // Atualiza a lista de categorias após criar uma nova
          })
          .catch((error) => {
            console.error("Erro ao criar nova categoria:", error);
          });
    
        console.log('Valor do Categoria:', category);
        console.log('Valor selecionado:', selectedValue);
        console.log('Valor da Descrição:', descricao);
        console.log('Valor do Código de Segurança:', codigoSeguranca);
    
        setFormSubmitted(true);

        // Limpeza dos campos do formulário
        setCategory("");
        setSelectedValue("");
        setDescricao("");
        setCodigoSeguranca("");
      }
    };    

    const categoriaCores = {
        FrontEnd: {
          color: variaveis.corGrayDark,
          backgroundColor: variaveis.corFrontEnd,
        },
        BackEnd: {
          color: variaveis.corGrayDark,
          backgroundColor: variaveis.corBackEnd,
        },
        Inovação: {
          color: variaveis.corGrayDark,
          backgroundColor: variaveis.corInovation,
        },
        Marketing: {
          color: variaveis.corGrayDark,
          backgroundColor: variaveis.corMarketing,
        },
        Mobile: {
          color: variaveis.corGrayDark,
          backgroundColor: variaveis.corMobile,
        },
        Infraestrutura: {
          color: variaveis.corGrayDark,
          backgroundColor: variaveis.corInfra,
        },
        DataScience: {
          color: variaveis.corGrayDark,
          backgroundColor: variaveis.corDataScience,
        },
        UX: {
          color: variaveis.corGrayDark,
          backgroundColor: variaveis.corUX,
        },
      };
    
      const getCategoriaStyles = (categoria) => categoriaCores[categoria] || {};
    
      return (
        <>
          <Form onSubmit={handleSubmit}>
            <FormControl>
              <Legend>{titulo}</Legend>
              <CampoTexto placeholder="Categoria"
              type="text" 
              value={category}
              onChange={handleCategoryChange} 
              error={categoryError !== ''}
              helperText={categoryError}
              required
              />
              {categoryError && <Span>{categoryError}</Span>}
              <FormControl
                variant="filled"
                sx={{ backgroundColor: variaveis.corInput, borderRadius: 1, marginTop: 2, marginBottom: 2 }}
              >
                <InputLabel id="demo-simple-select-filled-label">Selecione uma opção</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-select"
                  value={selectedValue}
                  onChange={handleSelectChange}
                  error={selectedValueError !== ''}
                  helperText={selectedValueError}
                  required
                  sx={{ backgroundColor: variaveis.corInput, borderRadius: 1 }}
                >
                  {Object.keys(categoriaCores).map((categoria) => (
                    <MenuItem
                      key={categoria}
                      value={categoria}
                      style={getCategoriaStyles(categoria)}
                    >
                      {categoria}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedValueError && <Span>{selectedValueError}</Span>}
              <CampoTexto
              placeholder="Descrição"
              type="text" value={descricao}
              onChange={handleDescricaoChange}
              />
              <CampoTexto
              placeholder="Código de Segurança"
              type="number"
              value={codigoSeguranca}
              onChange={handleCodigoSegurancaChange}
              required
              error={codigoSegurancaError !== ''}
              helperText={codigoSegurancaError}
              />
              {codigoSegurancaError && <Span>{codigoSegurancaError}</Span>}
              <ButtonContainer>
                <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                <Button variant="outlined" onClick={handleDeleteFormSubmit}>Deletar</Button>
              </ButtonContainer>
              {formSubmitted && <P>Formulário enviado com sucesso!</P>}
            </FormControl>
          </Form>
          <TableContainer component={Paper} sx={{ minWidth: 270, maxWidth: 1000, marginLeft: 6, '@media (max-width: 993px)': { display: 'none', }}}>
            <Table sx={{ minWidth: 270, maxWidth: 1000, backgroundColor: variaveis.corGrayLighter }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index === editIndex ? (
                        <TextField
                          value={editedNome}
                          onChange={(e) => setEditedNome(e.target.value)}
                        />
                      ) : (
                        row.nome
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {index === editIndex ? (
                        <TextField
                          value={editedDescricao}
                          onChange={(e) => setEditedDescricao(e.target.value)}
                        />
                      ) : (
                        row.descricao
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {index === editIndex ? (
                        <div>
                          <Button variant="filled" onClick={() => handleSave(index)}>Salvar</Button>
                          <Button variant="filled" onClick={() => setEditIndex(null)}>Cancelar</Button>
                        </div>
                      ) : (
                        <div>
                          <Button variant="filled" onClick={() => handleEdit(index)}>Editar</Button>
                          <Button variant="filled" onClick={() => handleRemove(index)}>Remover</Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </>
      );
    };
    
export default SectionFormularioCategory;