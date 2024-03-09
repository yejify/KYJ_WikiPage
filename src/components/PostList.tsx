import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import ReactPaginate from 'react-paginate';
import { Post } from '../types/Post';

interface PostListProps {
  posts: Post[];
}

function PostList({ posts }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(0); // react-paginate는 0부터 시작
  const postsPerPage = 5;

  // 현재 페이지에서 표시할 포스트 계산
  const currentPosts = posts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage,
  );

  // 페이지 변경 핸들러
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <PostListWrap>
      <h2>Post List</h2>
      <Link to='/NewPost' id='newPostButton'>
        <button>NEW POST</button>
      </Link>
      <ul id='postListBox'>
        {currentPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/PostDetail/${post.id}`}>TITLE | {post.title}</Link>
          </li>
        ))}
      </ul>
      <StyledPaginateContainer // 이 부분을 StyledPaginateContainer 컴포넌트로 변경
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={Math.ceil(posts.length / postsPerPage)} // 총 페이지 수
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick} // 페이지 변경 시 호출될 함수
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </PostListWrap>
  );
}

export default PostList;

const PostListWrap = styled.section`
  h2 {
    margin: 10px auto;
    width: fit-content;
    font-size: 50px;
  }
  #newPostButton {
    position: absolute;
    border: 1px solid;
    border-radius: 5px;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    top: 165px;
    right: 100px;

    &:hover {
      color: #fff;
      background-color: #000;
    }
  }
  #newPostButton button {
    font-size: 20px;
  }
  #postListBox {
    margin: 50px 100px;
    border-top: 2px solid;
    height: 327px;
  }
  #postListBox li {
    border-bottom: 1px solid #cecece;
    height: 65px;
  }
  #postListBox li a {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
  }
`;
const StyledPaginateContainer = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  li {
    display: flex;
    width: 35px;
    height: 35px;
    align-items: center;
    justify-content: center;
    color: #d9d9d9;

    a {
      display: flex;
      cursor: pointer;
      font-size: 20px;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;

      &:hover {
        color: #7d7b7b;
      }
    }
  }
  .active {
    border-bottom: 1px solid;
    color: #000;
  }
`;
