import styled, { keyframes, css } from 'styled-components';

export const LogoImg = styled.div`
  max-width: 700px;
  margin: 40px auto;
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${(props) => props.theme.colors.border};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
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

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #04d361;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    & + li {
      border-top: 1px solid ${(props) => props.theme.colors.border};
    }

    img {
      width: 75px;
      border-radius: 50%;
    }

    div {
      margin: 0 15px;
      flex: 1;

      strong {
        font-size: 20px;
        color: ${(props) => props.theme.colors.title};
      }

      p {
        font-size: 18px;
        color: #777787;
        margin-top: 4px;
      }
    }

    a {
      color: ${(props) => props.theme.colors.secundary};
      text-decoration: none;
      transition: 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
