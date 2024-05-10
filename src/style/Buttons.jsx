import styled from 'styled-components';

// Base button style
const BaseButton = styled.button`
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
`;

// Login button
export const LoginBtn = styled(BaseButton)`
  background: ${(props) => props.theme.color.lightBlack};
  :hover {
    border-color: ${(props) => props.theme.color.lightBlack};
    background: transparent;
    color: black;
  }
`;

// Model button
export const ModelBtn = styled(LoginBtn)`
  :hover {
    background: white;
    color: #000;
  }
`;

// Model loading button
export const ModelLoadingBtn = styled(ModelBtn)`
  background: ${(props) => props.theme.color.black};
  width: 100%;
  :hover {
    background: ${(props) => props.theme.color.black};
    color: white;
  }
`;

// Hero button
export const HeroBtn = styled(LoginBtn)`
  background: #fdfdfd;
  color: ${(props) => props.theme.color.black};
  border-radius: 49px;
  :hover {
    background: ${(props) => props.theme.color.black};
    border-color: transparent;
  }
`;

// Book Button
export const BookBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.black};
  width: 160px;
  font-size: 20px;
  border-radius: 49px;
  :hover {
    background: #ffffff;
    color: ${(props) => props.theme.color.black};
  }
`;

// Delete button
export const DeletingBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.red};
  width: 100%;
  :hover {
    background: white;
    color: ${(props) => props.theme.color.red};
  }
`;

// Update button
export const UpdateBtn = styled(LoginBtn)`
  background: ${(props) => props.theme.color.black};
  :hover {
    color: ${(props) => props.theme.color.black};
  }
`;