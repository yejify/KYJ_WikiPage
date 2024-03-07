import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function EditPost({ updatePost, posts }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { post: initialPost } = location.state;

  const [title, setTitle] = useState(initialPost.title || '');
  const [content, setContent] = useState(initialPost.content || '');
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setTitle(initialPost.title);
    setContent(initialPost.content);
  }, [initialPost]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setIsModified(true);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
    setIsModified(true);
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // 수정된 포스트 객체 생성
    const updatedPost = {
      ...initialPost, // 기존 포스트 데이터 복사
      title, // 수정된 제목
      content, // 수정된 내용
    }; // App 컴포넌트로 수정된 포스트 전달
    updatePost(updatedPost);

    // 수정 완료 후 해당 포스트의 상세 페이지로 이동
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
