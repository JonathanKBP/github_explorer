import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSpinner, FaArrowAltCircleLeft } from 'react-icons/fa';
import { ThemeContext } from 'styled-components';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logoDark.svg';
import { Loading, Owner, IssueList, Header, Filter } from './styles';

import Container from '../../components/Container';

const Repository = (props) => {
  const theme = useContext(ThemeContext);
  const [repository, setRepository] = useState();
  const [issues, setIssues] = useState();
  const [loading, setLoading] = useState(true);
  const listFilter = [
    { id: 0, name: 'all' },
    { id: 1, name: 'open' },
    { id: 2, name: 'closed' },
  ];
  const [filter, setFilter] = useState(0);

  useEffect(async () => {
    const { match } = props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repositoryData, issuesData] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: listFilter[filter].name,
          per_page: 5,
        },
      }),
    ]);
    setRepository(repositoryData.data);
    setIssues(issuesData.data);
    setLoading(false);
  }, []);

  async function handleAddFilterIssues(event) {
    event.preventDefault();

    const issuesData = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: listFilter[filter].name,
        per_page: 5,
      },
    });
    setIssues(issuesData.data);
  }

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
        <img
          src={theme.title === 'light' ? logo : logoDark}
          alt="Github Explorer"
        />

        <Link to="/">
          <FaArrowAltCircleLeft size={20} />
          <p>Voltar</p>
        </Link>
      </Header>

      <Container>
        <Owner>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filter>
          <span>Filtro</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {listFilter.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
          <button type="button" onClick={handleAddFilterIssues}>
            Filtrar
          </button>
        </Filter>

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
};
export default Repository;
Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
