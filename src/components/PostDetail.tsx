import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostDetailProps {
  posts: Post[];
  onDelete: (postId: string) => void; // onDelete 함수의 타입을 명시
}

function PostDetail({ posts, onDelete }: PostDetailProps) {
  const { postId } = useParams<{ postId: string }>(); // useParams의 제네릭을 사용하여 타입 명시
  const navigate = useNavigate();

  // postId와 일치하는 post를 찾을 때, postId를 숫자로 변환
  const post = posts.find((post) => post.id.toString() === postId);

  if (!post) {
    return <p>포스트를 찾을 수 없습니다.</p>;
  }

  const sortedPosts = [...posts].sort(
    (a, b) => b.title.length - a.title.length
  );

  const contentComponents: React.ReactNode[] = [];
  let remainingContent = post.content;

  sortedPosts.forEach(({ id, title }) => {
    const index = remainingContent.indexOf(title);
    if (index !== -1) {
      if (index > 0) {
        contentComponents.push(remainingContent.substring(0, index));
      }

      contentComponents.push(
        <Link key={id} to={`/postDetail/${id}`}>
          {title}
        </Link>
      );

      remainingContent = remainingContent.substring(index + title.length);
    }
  });

  if (remainingContent) {
    contentComponents.push(remainingContent);
  }

  const handleEditClick = () => {
    navigate(`/editPost/${post.id}`, { state: { post } });
  };

  const handleDelete = () => {
    onDelete(postId!); // postId가 undefined일 수 없음을 보장하기 위해 non-null assertion 사용
    navigate('/');
  };

  return (
    <>
      <h2>{post.title}</h2>
      <div>{contentComponents}</div>{' '}
      <button onClick={handleEditClick}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </>
  );
}

export default PostDetail;
