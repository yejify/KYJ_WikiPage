import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <NotFoundWrap>
      <h2>404</h2>
      <p>page not found</p>
      <Link to='/'>
        <button>BACK HOME</button>
      </Link>
    </NotFoundWrap>
  );
}
export default NotFound;

const NotFoundWrap = styled.section`
  text-align: center;
  margin-top: 200px;
  h2 {
    font-size: 100px;
  }
  p {
    font-size: 40px;
    margin-bottom: 15px;
  }
  button {
    border: 1px solid;
    border-radius: 5px;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    &:hover {
      color: #fff;
      background-color: #000;
    }
  }
`;
