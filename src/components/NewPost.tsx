import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface NewPostProps {
  onAddPost: (post: Post) => void;
  posts: Post[];
}

function NewPost({ onAddPost, posts }: NewPostProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 제목 중복 검사
    const existingPost = posts.find((post) => post.title === title);
    if (existingPost) {
      setErrorMessage('이미 존재하는 제목입니다.');
      return; // 중복되는 경우 추가 처리를 중단
    }

    const id = Date.now();
    onAddPost({ id, title, content });
    navigate('/');
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorMessage(''); // 제목을 수정하면 에러 메시지 초기화
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>제목</label>
        <input
          id='title'
          type='text'
          placeholder='제목을 입력하세요'
          value={title}
          onChange={handleTitleChange}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <label htmlFor='content'>내용</label>
        <input
          id='content'
          type='text'
          placeholder='내용을 입력하세요'
          value={content}
          onChange={handleContentChange}
        />
        <button type='submit'>생성</button>
      </form>
    </>
  );
}

export default NewPost;
