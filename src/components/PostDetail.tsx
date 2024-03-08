import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import { styled } from 'styled-components';

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
    return <NotFound />;
  }

  // 전체 내용을 담을 배열
  const contentWithLinks: React.ReactNode[] = [];
  let lastIndex = 0; // 마지막으로 처리한 인덱스

  // 제목이 포함된 위치를 찾아서 링크를 생성하는 함수
  posts.forEach(({ id, title }) => {
    let titleIndex = post.content.indexOf(title, lastIndex);
    while (titleIndex !== -1) {
      // 제목 이전의 텍스트 추가
      if (titleIndex > lastIndex) {
        contentWithLinks.push(post.content.substring(lastIndex, titleIndex));
      }

      // 제목을 Link로 변환
      contentWithLinks.push(
        <Link key={`${id}-${titleIndex}`} to={`/postDetail/${id}`}>
          {title}
        </Link>,
      );

      // 조사 처리: 제목 바로 뒤의 조사를 식별하기 위한 정규식
      const postTitleRegex = new RegExp(`^(${title})([가-힣]{1,2})`, 'g');
      const matches = postTitleRegex.exec(post.content.substring(titleIndex));

      if (matches && matches[2]) {
        // 조사가 식별된 경우, 조사도 텍스트로 추가
        contentWithLinks.push(matches[2]);
      }

      // 다음 검색 시작 위치 업데이트
      lastIndex =
        titleIndex +
        title.length +
        (matches && matches[2] ? matches[2].length : 0);
      titleIndex = post.content.indexOf(title, lastIndex); // 다음 제목 위치 검색
    }
  });

  // 마지막 제목 이후의 내용 추가
  if (lastIndex < post.content.length) {
    contentWithLinks.push(post.content.substring(lastIndex));
  }

  const handleEditClick = () => {
    navigate(`/editPost/${post.id}`, { state: { post } });
  };

  const handleDelete = () => {
    onDelete(postId!); // postId가 undefined일 수 없음을 보장하기 위해 non-null assertion 사용
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
