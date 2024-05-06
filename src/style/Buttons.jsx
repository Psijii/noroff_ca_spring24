import styled from 'styled-components';

export const LoginBtn = styled.button`
  background: ${(props) => props.theme.color.lightBlack};
  padding: 0.375rem 0.75rem;
  color: white;
  border: 1px solid transparent;
  text-decoration: none;
  line-height: 1.5;
  display: flex;
  border-radius: 0.25rem;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  :hover {
    border: 1px solid ${(props) => props.theme.color.lightBlack};
    background: transparent;
    color: black;
  }
`;

export const ModelBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.lightBlack};
  :hover {
    border: 1px solid ${(props) => props.theme.color.lightBlack};
    background: white;
    color: #000000;
  }
`;

export const ModelLoadingBtn = styled(ModelBtn)`
  background: ${(props) => props.theme.color.black};
  width: 100%;
  :hover {
    background: ${(props) => props.theme.color.black};
    color: white;
  }
`;

export const HeroBtn = styled(LoginBtn)`
  background: #fdfdfd;
  color: ${(props) => props.theme.color.black};
  border-radius: 49px;
  :hover {
    background: ${(props) => props.theme.color.black};
    color: white;
    border: 1px solid transparent;
  }
`;

export const BookBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.black};
  color: white;
  width: 160px;
  font-size: 20px;
  border-radius: 49px;
  :hover {
    border: 1px solid ${(props) => props.theme.color.black};
    background: #ffffff;
    color: ${(props) => props.theme.color.black};
  }
`;

export const DeletingBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.red};
  color: white;
  width: 100%;
  :hover {
    border: 1px solid ${(props) => props.theme.color.red};
    background: white;
    color: ${(props) => props.theme.color.red};
  }
`;

export const UpdateBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.black};
  :hover {
    border: 1px solid ${(props) => props.theme.color.black};
    color: ${(props) => props.theme.color.black};
  }
`;
