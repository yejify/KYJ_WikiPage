import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import { styled } from 'styled-components';
import { Post } from '../types/Post';

interface PostDetailProps {
  posts: Post[];
  onDelete: (postId: string) => void;
}

function PostDetail({ posts, onDelete }: PostDetailProps) {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const post = posts.find((post) => post.id.toString() === postId);

  if (!post) {
    return <NotFound />;
  }

  // 제목 위치와 관련 정보를 저장하기 위한 배열
  let titlesInfo: {
    index: number;
    length: number;
    id: string;
    title: string;
  }[] = [];

  // 원본 content에서 모든 제목의 위치 정보 수집
  posts.forEach(({ id, title }) => {
    let index = post.content.indexOf(title);
    while (index !== -1) {
      titlesInfo.push({ index, length: title.length, id, title });
      index = post.content.indexOf(title, index + title.length);
    }
  });

  // 위치 정보를 바탕으로 contentWithLinks 배열 생성
  const contentWithLinks = [];
  let lastIndex = 0;

  // 위치 정보를 기준으로 정렬
  titlesInfo.sort((a, b) => a.index - b.index);

  titlesInfo.forEach(({ id, title, index, length }) => {
    // 이전 제목과 현재 제목 사이의 텍스트 추가
    if (index > lastIndex) {
      contentWithLinks.push(post.content.substring(lastIndex, index));
    }
    // 현재 제목에 대한 링크 생성
    contentWithLinks.push(
      <Link key={`${id}-${index}`} to={`/postDetail/${id}`}>
        {title}
      </Link>,
    );
    lastIndex = index + length;
  });

  // 마지막 제목 이후의 텍스트 추가
  if (lastIndex < post.content.length) {
    contentWithLinks.push(post.content.substring(lastIndex));
  }

  const handleEditClick = () => {
    navigate(`/editPost/${post.id}`, { state: { post } });
  };

  const handleDelete = () => {
    onDelete(postId!);
    navigate('/');
  };

  return (
    <PostDetailWrap>
      <h2>
        TITLE | <span>{post.title}</span>
      </h2>
      <p id='contentTitle'>CONTENT</p>
      <div id='contentTxt'>{contentWithLinks}</div>
      <div id='buttonBox'>
        <button onClick={handleEditClick}>EDIT</button>
        <button onClick={handleDelete}>DELETE</button>
      </div>
    </PostDetailWrap>
  );
}

export default PostDetail;

const PostDetailWrap = styled.section`
  margin: 30px 100px 0 100px;
  width: auto;
  h2 {
    font-size: 40px;
    margin-bottom: 30px;
  }
  h2 span {
    font-size: 35px;
    color: #7d7b7b;
  }
  #contentTitle {
    margin-bottom: 16px;
    font-size: 38px;
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
  #contentTxt {
    min-height: 250px;
    border-radius: 10px;
    background-color: #f6f6f6;
    padding: 20px;
    margin-bottom: 30px;
    color: #7d7b7b;
    line-height: 1.5;
  }
  #contentTxt a {
    color: #000;
    text-decoration: underline;
  }
  #buttonBox {
    display: flex;
    gap: 25px;
    position: absolute;
    right: 100px;
  }
`;
