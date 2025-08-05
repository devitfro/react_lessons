import styled, { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
`;

export const Page = styled.div`
width: 100%;
height: 100vh;
padding: 50px 0 0;
background: ${props => props.theme.background};
transition: background 0.5s;
display: flex;
flex-direction: column;
align-items: center;
`;

export const Title = styled.p`
  color: #BF4F74;
  text-align: center;
  font-size: 58px;
  margin: 100px 0 50px 0;
`;

export const ShowDate = styled.p`
  text-align: center;
  font-size: 24px;
  color: ${props => props.theme.color};
  margin-bottom: 24px;
`

export const ShowTime = styled.p`
  width: 300px;
  padding: 16px;
  font-size: 24px;
  color: ${props => props.theme.color};
  border: 2px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  text-align: center;
`;