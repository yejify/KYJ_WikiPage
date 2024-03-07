import React from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';

function PostDetail({ posts, onDelete }) {
  const { postId } = useParams();
  const post = posts.find((post) => post.id.toString() === postId);
  const navigate = useNavigate();
  if (!post) {
    return <p>포스트를 찾을 수 없습니다.</p>;
  }

  // 포스트 제목을 길이에 따라 내림차순으로 정렬
  const sortedPosts = [...posts].sort(
    (a, b) => b.title.length - a.title.length
  );

  // 포스트 내용을 React 컴포넌트 배열로 변환
  const contentComponents = [];
  let remainingContent = post.content;

  sortedPosts.forEach(({ id, title }) => {
    // 현재 남아 있는 내용에서 제목을 찾음
    const index = remainingContent.indexOf(title);
    if (index !== -1) {
      // 제목 이전의 내용 추가
      if (index > 0) {
        contentComponents.push(remainingContent.substring(0, index));
      }
      // 제목에 해당하는 부분을 Link 컴포넌트로 추가
      contentComponents.push(
        <Link key={id} to={`/postDetail/${id}`}>
          {title}
        </Link>
      );
      // 남은 내용 업데이트
      remainingContent = remainingContent.substring(index + title.length);
    }
  });

  // 남은 내용 추가
  if (remainingContent) {
    contentComponents.push(remainingContent);
  }
  const handleEditClick = () => {
    navigate('/editPost/${post.id}', { state: { post } });
  };
  const handleDelete = (event) => {
    console.log(post);
    onDelete(postId);
    navigate('/');
  };
  return (
    <>
      <h2>{post.title}</h2>
      <p>{contentComponents}</p>
      <button onClick={handleEditClick}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </>
  );
}

export default PostDetail;
