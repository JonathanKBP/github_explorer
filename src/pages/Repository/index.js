import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSpinner, FaArrowAltCircleLeft } from 'react-icons/fa';
import api from '../../services/api';

import { Loading, Owner, IssueList, Header } from './styles';
import Container from '../../components/Container';
import logo from '../../assets/logo.svg';

export default class Repository extends Component {
  constructor() {
    super();
    this.state = {
      repository: {},
      issues: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return (
        <Loading loading={loading}>
          <p>Carregando</p>
          <FaSpinner size={35} />
        </Loading>
      );
    }

    return (
      <>
        <Header>
          <img src={logo} alt="Github Explorer" />

          <Link to="/">
            <FaArrowAltCircleLeft size={20} />
            <p>Voltar</p>
          </Link>
        </Header>

        <Container>
          <Owner>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <IssueList>
            {issues.map((issue) => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url} target="avatar_url">
                      {issue.title}
                    </a>
                    {issue.labels.map((label) => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
        </Container>
      </>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
