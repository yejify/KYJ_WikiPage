import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
    <>
      <form onSubmit={handleSubmit}>
        <label>
          제목
          <input type='text' value={title} onChange={handleTitleChange} />
        </label>
        <label>
          내용
          <textarea value={content} onChange={handleContentChange} />
        </label>
        <button type='button' onClick={handleCancel}>
          취소
        </button>
        <button type='submit' disabled={!isModified}>
          저장
        </button>
      </form>
    </>
  );
}

export default EditPost;
