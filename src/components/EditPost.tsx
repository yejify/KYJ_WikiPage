import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface EditPostProps {
  updatePost: (post: Post) => void;
  posts: Post[];
}

function EditPost({ updatePost, posts }: EditPostProps) {
  const navigate = useNavigate();
  const location = useLocation();
  // location.state의 타입을 보장하기 위한 타입 단언 사용
  const { post: initialPost } = location.state as { post: Post };

  const [title, setTitle] = useState<string>(initialPost.title || '');
  const [content, setContent] = useState<string>(initialPost.content || '');
  const [isModified, setIsModified] = useState<boolean>(false);

  useEffect(() => {
    setTitle(initialPost.title);
    setContent(initialPost.content);
  }, [initialPost]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsModified(true);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    setIsModified(true);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedPost: Post = {
      ...initialPost,
      title,
      content,
    };
    updatePost(updatedPost);
    navigate(`/postDetail/${initialPost.id}`);
  };

  return (
    <EditPostWrap>
      <form onSubmit={handleSubmit}>
        <label>
          TITLE
          <input type='text' value={title} onChange={handleTitleChange} />
        </label>
        <label>
          CONTENT
          <textarea value={content} onChange={handleContentChange} />
        </label>
        <div id='buttonBox'>
          <button type='button' onClick={handleCancel}>
            CANCEL
          </button>
          <button type='submit' disabled={!isModified}>
            SAVE
          </button>
        </div>
      </form>
    </EditPostWrap>
  );
}

export default EditPost;
const EditPostWrap = styled.section`
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
    &:hover {
      color: #fff;
      background-color: #000;
    }
  }
  #buttonBox {
    display: flex;
    gap: 25px;
    position: absolute;
    right: 100px;
  }
`;
