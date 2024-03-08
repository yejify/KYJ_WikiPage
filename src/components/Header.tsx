import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

function Header() {
  const location = useLocation(); // 현재 위치 정보를 가져옴
  const isNotHome = location.pathname !== '/'; // 홈 ('/')이 아닌지 여부를 확인
  return (
    <HeaderWrap>
      <Link to='/'>
        {isNotHome ? (
          <h1 className='header'> Wiki Page</h1>
        ) : (
          <h1>
            Wiki
            <br />
            Page
          </h1>
        )}
      </Link>
    </HeaderWrap>
  );
}
export default Header;

const HeaderWrap = styled.header`
  h1 {
    font-size: 30px;
    margin: 70px 0 0 100px;
  }
  .header {
    font-size: 48px;
    margin: 60px 100px 0 100px;
    width: auto;
    padding-bottom: 27px;
    border-bottom: 1px solid;
  }
`;
