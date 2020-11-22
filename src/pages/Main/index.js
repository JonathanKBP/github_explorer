import React, { Component } from 'react';

import {
  FaArrowAltCircleRight,
  FaGithubAlt,
  FaPlus,
  FaSpinner,
} from 'react-icons/fa';
import Switch from 'react-switch';
// import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';

import { Form, SubmitButton, List, LogoImg, HeaderContainer } from './styles';
import logo from '../../assets/logo.svg';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
      theme: '',
    };
  }

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    const theme = localStorage.getItem('theme');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
    if (theme) {
      this.setState({ theme: JSON.parse(theme) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories, theme } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
    if (prevState.theme !== theme) {
      localStorage.setItem('theme', JSON.stringify(theme));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  switchTheme = () => {
    const { theme } = this.state;

    if (theme === 'light') {
      this.setState({ theme: 'dark' });
    } else {
      this.setState({ theme: 'light' });
    }
  };

  hanleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    // const data = {
    //   name: response.data.full_name,
    // };

    this.setState({
      repositories: [...repositories, response.data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, repositories, theme } = this.state;

    return (
      <>
        <LogoImg>
          <img src={logo} alt="Github Explorer" />
        </LogoImg>

        <Container>
          <HeaderContainer>
            <h1>
              <FaGithubAlt />
              Repositórios
            </h1>
            <Switch
              onChange={this.switchTheme}
              checked={theme === 'light'}
              checkedIcon={false}
              uncheckedIcon={false}
              height={20}
              width={40}
              onColor="#04d361"
            />
          </HeaderContainer>

          <Form onSubmit={this.hanleSubmit}>
            <input
              type="text"
              placeholder="Adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
            />
            <SubmitButton loading={loading}>
              {loading ? (
                <FaSpinner color="#FFF" size={14} />
              ) : (
                <FaPlus color="#FFF" size={14} />
              )}
            </SubmitButton>
          </Form>

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
      </>
    );
  }
}

// Main.propTypes = {
//   toggleTheme: PropTypes.func.isRequired,
// };
