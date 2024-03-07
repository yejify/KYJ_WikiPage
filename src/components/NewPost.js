import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPost({ onAddPost, posts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
  const navigate = useNavigate();

  const handleSubmit = (event) => {
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setErrorMessage(''); // 제목을 수정하면 에러 메시지 초기화
  };

  const handleContentChange = (event) => {
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
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}{' '}
        {/* 에러 메시지 표시 */}
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
