import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function PostList({ posts }) {
  const [currentPage, setCurrentPage] = useState(0); // react-paginate는 0부터 시작
  const postsPerPage = 5;

  // 현재 페이지에서 표시할 포스트 계산
  const currentPosts = posts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  // 페이지 변경 핸들러
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <div>
        <h2>List</h2>
        <Link to='/NewPost'>
          <button>새 글 작성</button>
        </Link>
      </div>
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/PostDetail/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        breakLabel={'...'}
        pageCount={Math.ceil(posts.length / postsPerPage)} // 총 페이지 수
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick} // 페이지 변경 시 호출될 함수
        containerClassName={'pagination'} // Pagination container class
        activeClassName={'active'} // Active page number class
      />
    </>
  );
}

export default PostList;
