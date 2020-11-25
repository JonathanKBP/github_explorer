import React, { useEffect, useState } from 'react';

import {
  FaArrowAltCircleRight,
  FaGithubAlt,
  FaPlus,
  FaSpinner,
} from 'react-icons/fa';
import Switch from 'react-switch';

import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logoDark.svg';
import {
  Form,
  SubmitButton,
  List,
  LogoImg,
  HeaderContainer,
  Err,
} from './styles';
import GlobalStyle from '../../styles/global';
import light from '../../styles/themes/light';
import dark from '../../styles/themes/dark';
import Container from '../../components/Container';
import usePersistedState from '../../hooks/usePersistedState';
// import { toggleTheme } from '../../App';

const Main = () => {
  const [newRepo, setNewRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = usePersistedState('theme', light);
  const [inputErr, setInputErr] = useState('');

  // Carregar os dados do localStorage
  const [repositories, setRepositories] = useState(() => {
    const storageRepositories = localStorage.getItem('repositories');

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, theme);

  // Função para adicionar um novo repositório
  async function handleAddRepository(event) {
    event.preventDefault();
    setLoading(true);

    if (!newRepo) {
      setInputErr('Digite autor/nome do repositório.');
      setLoading(false);
      return;
    }

    try {
      repositories.map((repository) => {
        if (newRepo === repository.full_name) {
          throw new Error('Repositório já adicionado');
        }
        return false;
      });
      const response = await api.get(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputErr('');
      setLoading(false);
    } catch (err) {
      switch (err.message) {
        case 'Repositório já adicionado':
          setInputErr(err.message);
          break;
        default:
          setInputErr('Repositório não encontrado.');
      }

      setLoading(false);
    }
  }

  function switchTheme() {
    setTheme(theme.title === 'light' ? dark : light);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LogoImg>
        <img
          src={theme.title === 'light' ? logo : logoDark}
          alt="Github Explorer"
        />
      </LogoImg>

      <Container>
        <HeaderContainer>
          <h1>
            <FaGithubAlt />
            Repositórios
          </h1>
          <Switch
            onChange={switchTheme}
            checked={theme.title === 'light'}
            checkedIcon={false}
            uncheckedIcon={false}
            height={20}
            width={40}
            onColor="#04d361"
          />
        </HeaderContainer>

        <Form onSubmit={handleAddRepository} err={inputErr}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        {inputErr && <Err>{inputErr}</Err>}

        <List>
          {repositories.map((repository) => (
            <li key={repository.full_name}>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <Link
                to={`/repository/${encodeURIComponent(repository.full_name)}`}
              >
                <FaArrowAltCircleRight size={25} />
              </Link>
            </li>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default Main;
