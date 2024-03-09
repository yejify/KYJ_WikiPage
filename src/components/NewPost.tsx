import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Post } from '../types/Post';

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

    const id = Date.now().toString();
    onAddPost({ id, title, content });
    navigate('/');
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <NewPostWrap>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>TITLE</label>
        <input
          id='title'
          type='text'
          placeholder='제목을 입력하세요'
          value={title}
          onChange={handleTitleChange}
        />
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
        <label htmlFor='content'>CONTENT</label>
        <textarea
          id='content'
          placeholder='내용을 입력하세요'
          value={content}
          onChange={handleContentChange}
        />
        <button type='submit' disabled={!title || !content}>
          CREATE
        </button>
      </form>
    </NewPostWrap>
  );
}

export default NewPost;

const NewPostWrap = styled.section`
  margin: 30px 100px 0 100px;
  width: auto;
  label {
    display: block;
    font-size: 30px;
  }
  input,
  textarea {
    width: 100%;
    display: block;
    background-color: #f6f6f6;
    color: #7d7b7b;
    border-radius: 5px;
    padding: 20px;
    margin: 20px 0;
    font-size: 20px;
  }
  .errorMessage {
    color: red;
    width: fit-content;
    position: absolute;
    top: 240px;
    right: 120px;
  }
  textarea {
    min-height: 200px;
  }
  button {
    border: 1px solid;
    border-radius: 5px;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    float: right;
    &:hover {
      color: #fff;
      background-color: #000;
    }
    &:disabled {
      color: #cecece;
      border: 1px solid #cecece;
      cursor: default;
      &:hover {
        color: #7d7b7b;
        background-color: #fff;
      }
    }
  }
`;
