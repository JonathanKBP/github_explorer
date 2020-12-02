import styled, { keyframes, css } from 'styled-components';

export const Header = styled.div`
  max-width: 700px;
  margin: 40px auto;
  display: flex;
  justify-content: space-between;

  a {
    color: #f0f0f8;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #000;
    border-radius: 4px;
    padding: 5px;
    transition: 0.2s;

    &:hover {
      opacity: 0.8;
    }

    p {
      margin-left: 5px;
      font-weight: bolder;
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Filter = styled.div``;

export const Loading = styled.div.attrs((props) => ({
  disabled: props.loading,
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  p {
    color: ${(props) => props.theme.colors.secundary};
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  Link {
    background: #000;
  }
  a {
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    margin-left: 5px;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 4px;
    margin-top: 10px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50px;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: ${(props) => props.theme.colors.title};
        transition: 0.2s;

        &:hover {
          opacity: 0.8;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }
    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;
